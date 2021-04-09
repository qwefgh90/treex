import { Observable, Subject } from "rxjs";
import { INVALID_STATE } from "../../../message";
import { NodeProp } from "../view/node-prop";
import { ChildChangeEvent, ManipulationNode } from "./manipulation-node";
import { TreeResource } from "./tree-resource";
import { ViewNode, ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node"
import { filter, first, take } from "rxjs/operators";

export class TreeNode<T> implements ManipulationNode<T>{
    get prop(): NodeProp<T>{
        return {data: this.data, children: this.children.map(n => n.prop)};
    }
    get children(): ReadonlyArray<TreeNode<T>>{
        return [...this._internalChildren];//TODO: is performance okay? it's for providing a clone instance
    }//it's not likely be improved more. https://www.debugcn.com/ko/article/26632735.html
    get data(): T{
        return this._data;
    }
    get parent(): TreeNode<T> | "tree" | undefined{
        return this._parent;
    }
    get path(): string{
        throw new Error("It's been not implemented");
    }
    get selected(): boolean{
        return this._selected;
    }
    get visibility(): boolean{
        return this._visibility; 
    }
    get selectedNodes(): TreeNode<T>[]{
        return this.getNodes().filter(n => n.selected);
    }
    get height(): number{
        return this._height;
    }
    private _height = 1;
    private setChildren(children: Array<TreeNode<T>>, log: ChildChangeEvent<T>){
        this._internalChildren = children;
        this._childChangeSubject.next(log);
    }
    private _removedSubject: Subject<TreeNode<T>>;
    private _visibilityChangeSubject: Subject<ViewNodeVisibilityChange<T>>;
    private _nodeUpdatedSubject: Subject<ViewNodeUpdate<T>>;
    private _selectionSubject: Subject<ViewNodeSelectionChange<T>>;
    private _childChangeSubject: Subject<ChildChangeEvent<T>>;
    private _internalChildren: ReadonlyArray<TreeNode<T>> = [];//TODO: it is useful to improve performance
    private _visibility: boolean = true;
    private _data: T;
    private _selected: boolean = false;
    constructor(_prop: NodeProp<T>, private _parent: TreeNode<T> | "tree" | undefined,
        private readonly resource: TreeResource<T>
     ){
         this._removedSubject = resource._removedSubject;
         this._visibilityChangeSubject = resource._visibilityChangeSubject;
         this._nodeUpdatedSubject = resource._nodeUpdatedSubject;
         this._selectionSubject = resource._selectionSubject;
         this._childChangeSubject = resource._childChangeSubject;
        this._data = _prop.data;
        this.data = _prop.data;
        const newChildrenList = _prop.children?.map(prop => new TreeNode(prop, this, resource)) ?? [];
        this.setChildren(newChildrenList, {INITIALIZED: "INITIALIZED", node: this, children: newChildrenList});
        this.updateHeight();
    }
    //TODO: currently, it is private API
    //including itself
    // private getDescendants(): TreeNode<T>[]{
    //     return [this, ...this.children.reduce<TreeNode<T>[]>((p, c, i) => {
    //         p.push(...c.getDescendants());
    //         return p;
    //     }, [])];
    // }

    contains(node: TreeNode<T>): boolean{
        return this.getNodes().find(n => n == node) != undefined;
    }

    find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined{
        const found = this.bfs(({item, level}) => predicate(item), true)
        if(found.length > 0)
            return found[0].item;
        else return undefined;
    }

    private updateHeight(propagate: boolean = false){
        if(this._internalChildren.length == 0){
            this._height = 1;
        }else{
            const maxHeight = this._internalChildren.reduce((max, c, i) => {
                if(c._height > max){
                    return c._height;
                }else
                    return max;
            }, 0);
            this._height = maxHeight + 1;
        }
        if(propagate && this._parent instanceof TreeNode){
            this._parent.updateHeight();
        }
    }

    set data(_data: T){
        const previous = this._data;
        this._data = _data;
        this._nodeUpdatedSubject.next({data: _data, previous, node: this});
    }

    select(): void{
        this._selected = true;
        this._selectionSubject.next({selected: true, node: this});
    }

    deselect(): void{
        this._selected = false;
        this._selectionSubject.next({selected: false, node: this});
    }

    //TODO: update test case
    setVisibility(visibility: boolean){
        this._visibility = visibility;
        this._visibilityChangeSubject.next({visible: visibility, node: this});
    }

    appendChild(prop: NodeProp<T>): void{
        let addedNode = new TreeNode(prop, this, this.resource);
        const newChildrenList = [...this._internalChildren, addedNode];
        this.setChildren([...this._internalChildren, addedNode], {"ADDED": "ADDED", node: this, index: this._internalChildren.length,
            addedNode, children: newChildrenList});
        this.updateHeight(true);
    }
    
    appendBefore(prop: NodeProp<T>): boolean{
        if(this.parent == "tree" || this.parent == undefined)
            return false;
        const oldChildrenList = this.parent._internalChildren;
        const index = oldChildrenList.findIndex(n => n == this);
        if(index == -1){
            throw new Error(INVALID_STATE);
        }else{
            let addedNode = new TreeNode(prop, this.parent, this.resource);
            const newChildrenList = oldChildrenList.reduce<TreeNode<T>[]>((p, c, i) => {
                if(i == index)
                    p.push(addedNode);
                p.push(c);
                return p;
            }, []);
            this.parent.setChildren(newChildrenList, {"ADDED": "ADDED", node: this.parent, index,
            addedNode, children: newChildrenList});
            this.parent.updateHeight(true);
            return true;
        }
    }
    appendAfter(prop: NodeProp<T>): boolean{
        if(this.parent == "tree" || this.parent == undefined)
            return false;
        const oldChildrenList = this.parent._internalChildren;
        const index = oldChildrenList.findIndex(n => n == this);
        if(index == -1){
            throw new Error(INVALID_STATE);
        }else{
            let addedNode = new TreeNode(prop, this.parent, this.resource);
            const newChildrenList = oldChildrenList.reduce<TreeNode<T>[]>((p, c, i) => {
                p.push(c);
                if(i == index)
                    p.push(addedNode);
                return p;
            }, []);
            this.parent.setChildren(newChildrenList, {"ADDED": "ADDED", node: this.parent, index: index+1,
            addedNode, children: newChildrenList});
            this.parent.updateHeight(true);
            return true;
        }
    }
    
    remove(): boolean{
        if(this.parent == "tree" || this.parent == undefined)
            return false;
        const oldChildrenList = this.parent._internalChildren;
        const index = oldChildrenList.findIndex(n => n == this);
        if(index == -1){
            throw new Error(INVALID_STATE);
        }else{
            const newChildrenList = oldChildrenList.reduce<TreeNode<T>[]>((p, c, i) => {
                if(i != index)
                    p.push(c);
                return p;
            }, []);
            this.parent.setChildren(newChildrenList, {"REMOVED": "REMOVED", node: this.parent,
            removedNode: oldChildrenList[index], 
            children: newChildrenList, 
            oldChildren: oldChildrenList, 
            oldIndex: index});
            this.parent.updateHeight(true);
            this._removedSubject.next(this);
            return true;
        }
    }
    removeChild(node: TreeNode<T>): boolean{
        const oldChildrenList = this._internalChildren;
        let index = oldChildrenList.findIndex(v => v == node);
        if(index == -1){
            return false;
        }else{
            return oldChildrenList[index].remove();
        }
    }
    removeAllChildren(): number{
        const oldChildrenList = this._internalChildren;
        const result = oldChildrenList.map(n => this.removeChild(n)).filter(b => b);
        if(result.length != oldChildrenList.length){
            throw new Error(INVALID_STATE);
        }else{
            return oldChildrenList.length;
        }
    }

    getNodes(): TreeNode<T>[];
    getNodes(level: number): TreeNode<T>[];
    getNodes(strategy: "bfs" | "dfs"): TreeNode<T>[];
    getNodes(param?: any): TreeNode<T>[]{
        if(param == undefined){
            return this.bfs().map(({item}) => item);
        }else if(typeof param == "number"){
            return this.bfs(n => n.level == param).map(({item}) => item);
        }else if(param == "bfs" || param == "dfs"){
            if(param == "bfs")
                return this.bfs().map(({item}) => item);
            if(param == "dfs")
                return this.dfs().map(({item}) => item);
        }
        return [];
    }
    
    /**
     * starts from zero level
     * @param predicate 
     * @param stopWhenFound 
     * @returns 
     */
    bfs(predicate: (entry: {item: TreeNode<T>, level: number}) => boolean = () => true, stopWhenFound: boolean = false){
        let queue: Array<{item: TreeNode<T>, level: number}> = [];
        let bfsResult: Array<{item: TreeNode<T>, level: number}> = [];
        queue.push({item: this, level: 0});
        while(queue.length != 0){
            const entry = queue.shift() as {
                item: TreeNode<T>;
                level: number;
            };
            queue.push(...entry.item.children.map(v => ({item:v, level: entry.level+1})));
            if(predicate(entry)){
                bfsResult.push(entry);
                if(stopWhenFound)
                    return bfsResult;
            }
        }
        return bfsResult;
    }

    //TODO: performance issue
    private dfs(node: TreeNode<T> = this, level: number = 0, dfsContainer: Array<{item: TreeNode<T>, level: number}> = []){
        if(node){
            dfsContainer.push({item: node, level});
            node.children.forEach(n => {
                this.dfs(n, level+1, dfsContainer);
            });
        }
        return dfsContainer;
    }

    onChildChanged(): Observable<ChildChangeEvent<T>>{
        return this._childChangeSubject.pipe(filter(event => event.node == this));
    }

    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>{
        return this._visibilityChangeSubject.pipe(filter(event => event.node == this));
    }
    onUpdated(): Observable<ViewNodeUpdate<T>>{
        return this._nodeUpdatedSubject.pipe(filter(event => event.node == this));
    }

    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>{
        return this._selectionSubject.pipe(filter(event => event.node == this));
    }

    onRemoved(): Promise<TreeNode<T>>{
        return this._removedSubject.pipe(filter(node => node == this), first()).toPromise();
    }
}