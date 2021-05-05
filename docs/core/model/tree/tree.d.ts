import { Observable } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { View } from "../view/view";
import { ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node";
import { ChildChangeEvent } from "./manipulation-node";
import { TreeNode } from "./node";
/**
 * A Tree is a core unit to construct a new tree with leaves.
 * It watches changes of all leaf nodes and can traverse leaves.
 * A resource is an important property which is marked as private to manage all leaf nodes.
 *
 *
 * @typeParam T - a type of data which this node contains
 * @public
 */
export declare class Tree<T> implements View<T> {
    private _root;
    private resource;
    /**
     *
     * @remarks
     *
     * A instance of {@link TreeResource} must not be shared with other trees.
     *
     * @param _root - A root node of this tree
     * @param resource - A resource to detect all leaves
     */
    private constructor();
    /**
     * {@inheritDoc View.root}
     */
    get root(): TreeNode<T>;
    /**
     * This static method is the only way to build a new tree.
     *
     * @param nodeProp - A root node of this tree
     * @returns A new tree
     */
    static createTree<T>(nodeProp: NodeProp<T>): Tree<T>;
    /**
     * {@inheritDoc RootNode.height}
     */
    get height(): number;
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
    destroy(): void;
    /**
     * {@inheritDoc RootNode.getNodes}
     */
    getNodes(): TreeNode<T>[];
    /**
     * {@inheritDoc RootNode.getNodes}
     */
    getNodes(level: number): TreeNode<T>[];
    /**
     * {@inheritDoc RootNode.getNodes}
     */
    getNodes(strategy: "bfs" | "dfs"): TreeNode<T>[];
    /**
     * {@inheritDoc RootNode.contains}
     */
    contains(node: TreeNode<T>): boolean;
    /**
     * {@inheritDoc RootNode.find}
     */
    find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined;
    /**
     * {@inheritDoc View.onVisibilityChange}
     */
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    /**
     * {@inheritDoc View.onSelectionChange}
     */
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    /**
     * {@inheritDoc View.onUpdated}
     */
    onUpdated(): Observable<ViewNodeUpdate<T>>;
    /**
     *
     * @returns an observable which observe a removed node
     */
    onRemoved(): Observable<TreeNode<T>>;
    /**
     *
     * @returns an observable which observe an added node
     */
    onAdded(): Observable<ChildChangeEvent<T>>;
}
//# sourceMappingURL=tree.d.ts.map