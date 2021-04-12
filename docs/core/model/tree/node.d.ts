import { Observable } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { ChildChangeEvent, ManipulationNode } from "./manipulation-node";
import { TreeResource } from "./tree-resource";
import { ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node";
export declare class TreeNode<T> implements ManipulationNode<T> {
    private _parent;
    private readonly resource;
    get prop(): NodeProp<T>;
    get children(): ReadonlyArray<TreeNode<T>>;
    get data(): T;
    get parent(): TreeNode<T> | "tree" | undefined;
    get path(): string;
    get selected(): boolean;
    get visibility(): boolean;
    get selectedNodes(): TreeNode<T>[];
    get height(): number;
    private _height;
    private setChildren;
    private _removedSubject;
    private _visibilityChangeSubject;
    private _nodeUpdatedSubject;
    private _selectionSubject;
    private _childChangeSubject;
    private _internalChildren;
    private _visibility;
    private _data;
    private _selected;
    constructor(_prop: NodeProp<T>, _parent: TreeNode<T> | "tree" | undefined, resource: TreeResource<T>);
    contains(node: TreeNode<T>): boolean;
    find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined;
    private updateHeight;
    set data(_data: T);
    select(): void;
    deselect(): void;
    setVisibility(visibility: boolean): void;
    appendChild(prop: NodeProp<T>): void;
    appendBefore(prop: NodeProp<T>): boolean;
    appendAfter(prop: NodeProp<T>): boolean;
    remove(): boolean;
    removeChild(node: TreeNode<T>): boolean;
    removeAllChildren(): number;
    getNodes(): TreeNode<T>[];
    getNodes(level: number): TreeNode<T>[];
    getNodes(strategy: "bfs" | "dfs"): TreeNode<T>[];
    /**
     * starts from zero level
     * @param predicate
     * @param stopWhenFound
     * @returns
     */
    bfs(predicate?: (entry: {
        item: TreeNode<T>;
        level: number;
    }) => boolean, stopWhenFound?: boolean): {
        item: TreeNode<T>;
        level: number;
    }[];
    private dfs;
    onChildChanged(): Observable<ChildChangeEvent<T>>;
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    onUpdated(): Observable<ViewNodeUpdate<T>>;
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    onRemoved(): Promise<TreeNode<T>>;
}
//# sourceMappingURL=node.d.ts.map