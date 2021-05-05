import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { NodeProp } from "../view/node-prop";
import { RootNode } from "../view/root-node";
import { View } from "../view/view";
import { ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node";
import { ChildChangeEvent } from "./manipulation-node";
import { TreeNode } from "./node";
import { TreeResource } from "./tree-resource";
/**
 * A Tree is a core unit to construct a new tree with leaves.
 * It watches changes of all leaf nodes and can traverse leaves.
 * A resource is an important property which is marked as private to manage all leaf nodes.
 * 
 * 
 * @typeParam T - a type of data which this node contains
 * @public
 */
export class Tree<T> implements View<T>{
    /**
     * 
     * @remarks 
     * 
     * A instance of {@link TreeResource} must not be shared with other trees.
     * 
     * @param _root - A root node of this tree
     * @param resource - A resource to detect all leaves
     */
    private constructor(private _root: TreeNode<T>, private resource: TreeResource<T>){
    }
    /**
     * {@inheritDoc View.root}
     */
    get root(){
        return this._root;
    }
    /**
     * This static method is the only way to build a new tree.
     * 
     * @param nodeProp - A root node of this tree
     * @returns A new tree
     */
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
    /**
     * {@inheritDoc RootNode.height}
     */
    get height(): number{
        return this.root.height;
    };
    /**
     * Destory the resource of this tree.
     * 
     * @remarks
     * 
     * All subjects will be deallocated completely.
     * 
     * @privateRemarks
     * 
     * improve it
     */
    destroy(){
        this.resource._removedSubject.complete();
        this.resource._childChangeSubject.complete();
        this.resource._nodeUpdatedSubject.complete();
        this.resource._selectionSubject.complete();
        this.resource._visibilityChangeSubject.complete();
    }
    /**
     * {@inheritDoc RootNode.getNodes}
     */
    getNodes(): TreeNode<T>[]
    
    /**
     * {@inheritDoc RootNode.getNodes}
     */
    getNodes(level: number): TreeNode<T>[];
    
    /**
     * {@inheritDoc RootNode.getNodes}
     */
    getNodes(strategy: "bfs" | "dfs"): TreeNode<T>[];
    getNodes(param?: any) {
        return this.root.getNodes(param);
    }
    /**
     * {@inheritDoc RootNode.contains}
     */
    contains(node: TreeNode<T>): boolean{
        return this.root.contains(node);
    }
    /**
     * {@inheritDoc RootNode.find}
     */
    find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined{
        return this.root.find(predicate);
    }

    /**
     * {@inheritDoc View.onVisibilityChange}
     */
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>{
        return this.resource._visibilityChangeSubject.asObservable()
    }
    /**
     * {@inheritDoc View.onSelectionChange}
     */
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>{
        return this.resource._selectionSubject.asObservable();
    }
    /**
     * {@inheritDoc View.onUpdated}
     */
    onUpdated(): Observable<ViewNodeUpdate<T>>{
        return this.resource._nodeUpdatedSubject.asObservable();
    }
    /**
     * 
     * @returns an observable which observe a removed node
     */
    onRemoved(): Observable<TreeNode<T>>{
        return this.resource._removedSubject.asObservable();
    }
    /**
     * 
     * @returns an observable which observe an added node
     */
    onAdded(): Observable<ChildChangeEvent<T>>{
        return this.resource._childChangeSubject.pipe(filter(v => "INITIALIZED" in v));
    }
}