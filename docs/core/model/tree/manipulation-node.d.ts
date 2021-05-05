import { Observable } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { ViewNode } from "../view/view-node";
import { TreeNode } from "./node";
/**
 * It's an interface to provide APIs which manipulate a node for developers.
 * There are some event emitters. one of them emits events when detecting changes in child nodes
 * It can be a contract for developers to build treex.
 *
 * @typeParam T - a type of data which this node contains
 */
export interface ManipulationNode<T> extends ViewNode<T> {
    /**
     *
     * @param node - node to append to the end of current children
     */
    appendChild(node: NodeProp<T>): void;
    /**
     * It usually append a node successfully, but it isn't possible to append a node in front of root node.
     *
     * @returns if a node is appended successfully, return true, otherwise return false
     * @param node - node to append in front of itself
     */
    appendBefore(node: NodeProp<T>): boolean;
    /**
     *
     * It usually append a node successfully, but it isn't possible to append a node next to root node.
     *
     * @returns if a node is appended successfully, return true, otherwise return false
     * @param node - node to append next to itself
     */
    appendAfter(node: NodeProp<T>): boolean;
    /**
     * Remove itself in a tree it belong to.
     *
     * @returns if it's a node which is not a root return true, otherwise return false
     */
    remove(): boolean;
    /**
     * Remove a child node.
     * @returns if it's found in a child list return true, otherwise false
     * @param node - a node to remove
     */
    removeChild(node: TreeNode<T>): boolean;
    /**
     * Clean up a child list.
     * @returns the number of nodes which have been removed
     */
    removeAllChildren(): number;
    /**
     * When a node is removed in a tree it belongs to, it resolve a promise.
     * @returns a promise which is resolved when this node is removed.
     */
    onRemoved(): Promise<TreeNode<T>>;
    /**
     * @returns a observable which emits {@link ChildChangeEvent}
     */
    onChildChanged(): Observable<ChildChangeEvent<T>>;
}
/**
 * There are some events every node must emit when something changes on children.
 * @typeParam T - a type of data which this event's node contains
 */
export declare type ChildChangeEvent<T> = ChildAddedEvent<T> | ChildRemovedEvent<T> | ChildInitializedEvent<T>;
/**
 * When one child is added to a child list, it's emitted.
 * @typeParam T - a type of data which this event's node contains
 */
export interface ChildAddedEvent<T> {
    /**
     * To distinguish other events, existence of this property is checked.
     */
    ADDED: "ADDED";
    /**
     * A node which a added node belonged to.
     */
    node: TreeNode<T>;
    /**
     * A new index of a added node in a child list.
     */
    index: number;
    /**
     * A added node.
     */
    addedNode: TreeNode<T>;
    /**
     * @deprecated Use {@link TreeNode.children | the children property}
     * A new child list after adding a node.
     */
    children: ReadonlyArray<TreeNode<T>>;
}
/**
 * When one child is removed to a child list, it's emitted.
 * @typeParam T - a type of data which this event's node contains
 */
export interface ChildRemovedEvent<T> {
    /**
     * To distinguish other events, existence of this property is checked.
     */
    REMOVED: "REMOVED";
    /**
     * A node which a removed node belonged to.
     */
    node: TreeNode<T>;
    /**
     * A removed node.
     */
    removedNode: TreeNode<T>;
    /**
     * @deprecated Use {@link TreeNode.children | the children property}
     * A new child list after removing a node.
     */
    children: ReadonlyArray<TreeNode<T>>;
    /**
     * A old index of a removed node.
     */
    oldIndex: number;
    /**
     * A old child list which contains a removed node.
     */
    oldChildren: ReadonlyArray<TreeNode<T>>;
}
/**
 * When a child list is initialized first, it's emitted.
 * @typeParam T - a type of data which this event's node contains
 */
export interface ChildInitializedEvent<T> {
    /**
     * To distinguish other events, existence of this property is checked.
     */
    INITIALIZED: "INITIALIZED";
    /**
     * A node which has a list which has just initialized.
     */
    node: TreeNode<T>;
    /**
     * @deprecated Use {@link TreeNode.children | the children property}
     * A new child list which has just been initialized
     */
    children: ReadonlyArray<TreeNode<T>>;
}
//# sourceMappingURL=manipulation-node.d.ts.map