import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { NodeProp } from "../view/node-prop";
import { RootNode } from "../view/root-node";
import { View } from "../view/view";
import { ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node";
import { ChildChangeEvent } from "./manipulation-node";
import { TreeNode } from "./node";
import { TreeResource } from "./tree-resource";

export class Tree<T> implements View<T>{
    private constructor(private _root: TreeNode<T>, private resource: TreeResource<T>){
    }
    get root(){
        return this._root;
    }
    public static createTree<T>(nodeProp: NodeProp<T>){
        const resource: TreeResource<T> = {
            _removedSubject: new Subject<TreeNode<T>>(),
            _childChangeSubject: new Subject<ChildChangeEvent<T>>(),
            _nodeUpdatedSubject: new Subject<ViewNodeUpdate<T>>(),
            _selectionSubject: new Subject<ViewNodeSelectionChange<T>>(),
            _visibilityChangeSubject: new Subject<ViewNodeVisibilityChange<T>>()
        }
        let root = new TreeNode(nodeProp, "tree", resource);
        return new Tree(root, resource);
    }
    get height(): number{
        return this.root.height;
    };
    //TODO: improve it
    destroy(){
        this.resource._removedSubject.complete();
        this.resource._childChangeSubject.complete();
        this.resource._nodeUpdatedSubject.complete();
        this.resource._selectionSubject.complete();
        this.resource._visibilityChangeSubject.complete();
    }
    getNodes(): TreeNode<T>[]
    getNodes(level: number): TreeNode<T>[];
    getNodes(strategy: "bfs" | "dfs"): TreeNode<T>[];
    getNodes(param?: any) {
        return this.root.getNodes(param);
    }
    contains(node: TreeNode<T>): boolean{
        return this.root.contains(node);
    }
    find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined{
        return this.root.find(predicate);
    }

    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>{
        return this.resource._visibilityChangeSubject.asObservable()
    }
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>{
        return this.resource._selectionSubject.asObservable();
    }
    onUpdated(): Observable<ViewNodeUpdate<T>>{
        return this.resource._nodeUpdatedSubject.asObservable();
    }
    onRemoved(): Observable<TreeNode<T>>{
        return this.resource._removedSubject.asObservable();
    }
    onAdded(): Observable<ChildChangeEvent<T>>{
        return this.resource._childChangeSubject.pipe(filter(v => "INITIALIZED" in v));
    }
}