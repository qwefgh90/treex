import { Observable } from "rxjs";
import { TreeNode } from "../tree/node";
import { NodeProp } from "./node-prop";
import { RootNode } from "./root-node";
export interface ViewNode<T> extends RootNode<T> {
    readonly selectedNodes: ViewNode<T>[];
    readonly prop: NodeProp<T>;
    readonly children: ReadonlyArray<ViewNode<T>>;
    data: T;
    readonly parent: ViewNode<T> | "tree" | undefined;
    readonly path: string;
    readonly selected: boolean;
    readonly visibility: boolean;
    select(): void;
    deselect(): void;
    setVisibility(visibility: boolean): void;
    bfs(predicate: (entry: {
        item: TreeNode<T>;
        level: number;
    }) => boolean, stopWhenFound: boolean): {
        item: TreeNode<T>;
        level: number;
    }[];
}
export interface ViewNode<T> {
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    onUpdated(): Observable<ViewNodeUpdate<T>>;
}
export interface ViewNodeUpdate<T> {
    data: T;
    previous: T;
    node: ViewNode<T>;
}
export interface ViewNodeSelectionChange<T> {
    selected: boolean;
    node: ViewNode<T>;
}
export interface ViewNodeVisibilityChange<T> {
    visible: boolean;
    node: ViewNode<T>;
}
//# sourceMappingURL=view-node.d.ts.map