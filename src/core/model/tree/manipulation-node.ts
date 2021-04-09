import { Observable } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { ViewNode } from "../view/view-node";
import { TreeNode } from "./node";

export interface ManipulationNode<T> extends ViewNode<T>{
    appendChild(node: NodeProp<T>): void;
    appendBefore(node: NodeProp<T>): boolean;
    appendAfter(node: NodeProp<T>): boolean;
    remove(): boolean;
    removeChild(node: TreeNode<T>): boolean;
    removeAllChildren(): number;
    onRemoved(): Promise<TreeNode<T>>;
    onChildChanged(): Observable<ChildChangeEvent<T>>;
}

export type ChildChangeEvent<T> = ChildAddedEvent<T> | ChildRemovedEvent<T> | ChildInitializedEvent<T>;

export interface ChildAddedEvent<T>{
    ADDED: "ADDED";
    node: TreeNode<T>,
    index: number;
    addedNode: TreeNode<T>;
    children: ReadonlyArray<TreeNode<T>>;
}

export interface ChildRemovedEvent<T>{
    REMOVED: "REMOVED";
    node: TreeNode<T>,
    removedNode: TreeNode<T>;
    children: ReadonlyArray<TreeNode<T>>;
    oldIndex: number;
    oldChildren: ReadonlyArray<TreeNode<T>>;
}

export interface ChildInitializedEvent<T>{
    INITIALIZED: "INITIALIZED";
    node: TreeNode<T>,
    children: ReadonlyArray<TreeNode<T>>;
}