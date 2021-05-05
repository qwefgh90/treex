import { Observable } from "rxjs";
import { TreeNode } from "../tree/node";
import { NodeProp } from "./node-prop";
import { RootNode } from "./root-node";
/**
 * It defines APIs which a node in a tree should have.
 * Some APIs are usually not provided in other libraries.
 * There are {@link ViewNode.selectedNodes}, {@link ViewNode.select}, {@link ViewNode.deselect}, {@link ViewNode.setVisibility}
 * Because they are so useful and easy to implement, they are implimented with their own state.
 * It contains also observables to observe changes of {@link ViewNodeUpdate} and {@link ViewNodeSelectionChange} and {@link ViewNodeVisibilityChange}.
 * @remarks
 *
 * APIs for selection and visibility don't have side effects to its tree and other nodes.
 * Some side effects would degrade operation performance.
 *
 * @typeParam T - a type of data which this node contains
 * @public
 */
export interface ViewNode<T> extends RootNode<T> {
    /**
     * A list of selected nodes.
     */
    readonly selectedNodes: ViewNode<T>[];
    /**
     * A initial data which was provided when a node was created.
     */
    readonly prop: NodeProp<T>;
    /**
     * A child list.
     */
    readonly children: ReadonlyArray<ViewNode<T>>;
    /**
     * A data this node contains.
     */
    data: T;
    /**
     * If this node is a root, the parent property must be "tree".
     * If this node a node which is not a root and in a tree, it must be a existing node.
     * Otherwise, it must be undefined and this node isn't belonging to a tree.
     */
    readonly parent: ViewNode<T> | "tree" | undefined;
    /**
     * A string representation of this node's location.
     */
    readonly path: string;
    /**
     * Whether it is selected.
     */
    readonly selected: boolean;
    /**
     * Whether it is visible.
     */
    readonly visibility: boolean;
    /**
     * Select this node.
     */
    select(): void;
    /**
     * Deselect this node.
     */
    deselect(): void;
    /**
     * Set the visibility of this node.
     * @param visible - a prameter to change the visibility
     */
    setVisibility(visible: boolean): void;
    /**
     * Initially, it was deisgned to traverse a tree.
     * And two parameters were added newly to satisfy requirements without a performance loss.
     * It was required to remove some nodes from a result and stop it
     * when the predicate returns true during traversing the tree.
     * @param predicate - a filter to remove some nodes from a return
     * @param stopWhenFound - whether it stops when the predicate returns true
     * @returns it returns a list containing data which consists of a node and a level which the node is on.
     */
    bfs(predicate: (entry: {
        item: TreeNode<T>;
        level: number;
    }) => boolean, stopWhenFound: boolean): {
        item: TreeNode<T>;
        level: number;
    }[];
    /**
     * It's a event listener on changes of visibility status.
     * @returns an observable to observe {@link ViewNodeVisibilityChange}
     */
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    /**
     * It's a event listener on changes of selection status.
     * @returns an observable to observe {@link ViewNodeSelectionChange}
     */
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    /**
     * It's a event listener on changes of data.
     * @returns an observable to observe {@link ViewNodeUpdate}
     */
    onUpdated(): Observable<ViewNodeUpdate<T>>;
}
/**
 * An event interface for updated data
 * @public
 */
export interface ViewNodeUpdate<T> {
    /**
     * Data after a change happened
     */
    data: T;
    /**
     * Data before a change happened
     */
    previous: T;
    /**
     * A node where a change happened
     */
    node: ViewNode<T>;
}
/**
 * An event interface for selection
 * @public
 */
export interface ViewNodeSelectionChange<T> {
    /**
     * current status of selection
     */
    selected: boolean;
    /**
     * A node where a selection changed
     */
    node: ViewNode<T>;
}
/**
 * An event interface for visibility
 * @public
 */
export interface ViewNodeVisibilityChange<T> {
    /**
     * current status of visibility
     */
    visible: boolean;
    /**
     * A node where a change happens
     */
    node: ViewNode<T>;
}
//# sourceMappingURL=view-node.d.ts.map