import { Observable } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { ChildChangeEvent, ManipulationNode } from "./manipulation-node";
import { TreeResource } from "./tree-resource";
import { ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node";
/**
 * A TreeNode is a basic unit to construct a leaf in a tree.
 * The instantiation of {@link TreeNode} is usually done through {@link Tree.createTree} or some methods with {@link NodeProp}.
 * It provides fluent APIs and support a type parameter for data.
 *
 * @remarks
 *
 * It rarely happen to instantiate a instance of it on your own.
 *
 * @public
 * @typeParam T - a type of data which this node contains
 *
 */
export declare class TreeNode<T> implements ManipulationNode<T> {
    private _parent;
    private readonly resource;
    /**
     * {@inheritDoc ViewNode.prop}
     */
    get prop(): NodeProp<T>;
    /**
     * {@inheritDoc ViewNode.children}
     */
    get children(): ReadonlyArray<TreeNode<T>>;
    /**
     * {@inheritDoc ViewNode.data}
     */
    get data(): T;
    /**
     * {@inheritDoc ViewNode.parent}
     */
    get parent(): TreeNode<T> | "tree" | undefined;
    /**
     * {@inheritDoc ViewNode.path}
     */
    get path(): string;
    /**
     * {@inheritDoc ViewNode.selected}
     */
    get selected(): boolean;
    /**
     * {@inheritDoc ViewNode.visibility}
     */
    get visibility(): boolean;
    /**
     * {@inheritDoc ViewNode.selectedNodes}
     */
    get selectedNodes(): TreeNode<T>[];
    /**
     * {@inheritDoc RootNode.height}
     */
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
    /**
     *
     * @param _prop - properties which are used to instantiate new instance
     * @param _parent - a parent node
     * @param resource - shared resources with other nodes
     */
    constructor(_prop: NodeProp<T>, _parent: TreeNode<T> | "tree" | undefined, resource: TreeResource<T>);
    /**
     * {@inheritDoc RootNode.contains}
     */
    contains(node: TreeNode<T>): boolean;
    /**
     * {@inheritDoc RootNode.find}
     */
    find(predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined;
    private updateHeight;
    set data(_data: T);
    /**
     * {@inheritDoc ViewNode.select}
     */
    select(): void;
    /**
     * {@inheritDoc ViewNode.deselect}
     */
    deselect(): void;
    /**
     * {@inheritDoc ViewNode.setVisibility}
     */
    setVisibility(visibility: boolean): void;
    /**
     * {@inheritDoc ManipulationNode.appendChild}
     */
    appendChild(prop: NodeProp<T>): void;
    /**
     * {@inheritDoc ManipulationNode.appendBefore}
     */
    appendBefore(prop: NodeProp<T>): boolean;
    /**
     * {@inheritDoc ManipulationNode.appendAfter}
     */
    appendAfter(prop: NodeProp<T>): boolean;
    /**
     * {@inheritDoc ManipulationNode.remove}
     */
    remove(): boolean;
    /**
     * {@inheritDoc ManipulationNode.removeChild}
     */
    removeChild(node: TreeNode<T>): boolean;
    /**
     * {@inheritDoc ManipulationNode.removeAllChildren}
     */
    removeAllChildren(): number;
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
     * {@inheritDoc ViewNode.bfs}
     */
    bfs(predicate?: (entry: {
        item: TreeNode<T>;
        level: number;
    }) => boolean, stopWhenFound?: boolean): {
        item: TreeNode<T>;
        level: number;
    }[];
    private dfs;
    /**
     * {@inheritDoc ManipulationNode.onChildChanged}
     */
    onChildChanged(): Observable<ChildChangeEvent<T>>;
    /**
     * {@inheritDoc ViewNode.onVisibilityChange}
     */
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    /**
     * {@inheritDoc ViewNode.onUpdated}
     */
    onUpdated(): Observable<ViewNodeUpdate<T>>;
    /**
     * {@inheritDoc ViewNode.onSelectionChange}
     */
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    /**
     * {@inheritDoc ManipulationNode.onRemoved}
     */
    onRemoved(): Promise<TreeNode<T>>;
}
//# sourceMappingURL=node.d.ts.map