import { Observable } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { View } from "../view/view";
import { ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node";
import { ChildChangeEvent } from "./manipulation-node";
import { TreeNode } from "./node";
export declare class Tree<T> implements View<T> {
    private _root;
    private resource;
    private constructor();
    get root(): TreeNode<T>;
    static createTree<T>(nodeProp: NodeProp<T>): Tree<T>;
    get height(): number;
    destroy(): void;
    getNodes(): TreeNode<T>[];
    getNodes(level: number): TreeNode<T>[];
    getNodes(strategy: "bfs" | "dfs"): TreeNode<T>[];
    contains(node: TreeNode<T>): boolean;
    find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined;
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    onUpdated(): Observable<ViewNodeUpdate<T>>;
    onRemoved(): Observable<TreeNode<T>>;
    onAdded(): Observable<ChildChangeEvent<T>>;
}
//# sourceMappingURL=tree.d.ts.map