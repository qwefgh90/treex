import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * When one child is added to a child list, it's emitted.
 * @typeParam T - a type of data which this event's node contains
 */
export declare interface ChildAddedEvent<T> {
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
 * There are some events every node must emit when something changes on children.
 * @typeParam T - a type of data which this event's node contains
 */
export declare type ChildChangeEvent<T> = ChildAddedEvent<T> | ChildRemovedEvent<T> | ChildInitializedEvent<T>;

/**
 * When a child list is initialized first, it's emitted.
 * @typeParam T - a type of data which this event's node contains
 */
export declare interface ChildInitializedEvent<T> {
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

/**
 * When one child is removed to a child list, it's emitted.
 * @typeParam T - a type of data which this event's node contains
 */
export declare interface ChildRemovedEvent<T> {
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

export declare const classNameMap: Readonly<{
    outerClass: string;
    nodeBoxClass: string;
    childrenClass: string;
    valueClass: string;
    selectedClass: string;
    expandIconClass: string;
    collapseIconClass: string;
    hiddenClass: string;
    noneClass: string;
}>;

/**
 * It's an interface to provide APIs which manipulate a node for developers.
 * There are some event emitters. one of them emits events when detecting changes in child nodes
 * It can be a contract for developers to build treex.
 *
 * @typeParam T - a type of data which this node contains
 */
export declare interface ManipulationNode<T> extends ViewNode<T> {
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
 * A simple interface which contains information to make a node
 */
export declare interface NodeProp<T> {
    data: T;
    children?: NodeProp<T>[];
}

/**
 * to make all nodes to work as root
 * under the specific condition
 */
export declare interface RootNode<T> {
    readonly height: number;
    getNodes(): RootNode<T>[];
    getNodes(level: number): RootNode<T>[];
    getNodes(strategy: "bfs" | "dfs"): RootNode<T>[];
    contains(node: RootNode<T>): boolean;
    find(predicate: (node: RootNode<T>) => boolean): RootNode<T> | undefined;
}

export declare class TemplateFactory<T> {
    private readonly userFragment;
    private readonly userConnector;
    static getDefaultFactory<U extends ToStringInterface>(document: Document): TemplateFactory<U>;
    static readonly defaultConnector: <U extends ToStringInterface>(fragment: DocumentFragment, node: TreeNode<U>) => void;
    readonly fragment: DocumentFragment;
    readonly connector: (fragment: DocumentFragment, node: TreeNode<T>) => void;
    private constructor();
    static create<U extends ToStringInterface>(fragment: DocumentFragment, connector: (htmlElement: DocumentFragment, node: TreeNode<U>) => void): TemplateFactory<U>;
    private checkValidation;
    /**
     * to support collapse and expand
     * @param connector
     * @returns
     */
    private extendedConnector;
    /**
     * to support collapse and expand
     * @param fragment
     * @returns
     */
    private extendedFragment;
}

declare type ToStringInterface = Pick<string, "toString">;

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

declare interface TreeOption<T> {
    document: Document;
    templateFactory?: TemplateFactory<T>;
    hiddenRoot?: boolean;
}

export declare interface TreeResource<T> {
    _removedSubject: Subject<TreeNode<T>>;
    _visibilityChangeSubject: Subject<ViewNodeVisibilityChange<T>>;
    _nodeUpdatedSubject: Subject<ViewNodeUpdate<T>>;
    _selectionSubject: Subject<ViewNodeSelectionChange<T>>;
    _childChangeSubject: Subject<ChildChangeEvent<T>>;
}

export declare class TreeX {
    static createTree<T extends ToStringInterface>(tree: Tree<T>, option?: TreeOption<T>): HTMLElement;
    static templateFactory<T>(fragment: DocumentFragment, connector: (fragment: DocumentFragment, node: TreeNode<T>) => void): TemplateFactory<T>;
    static templateFactory<T extends ToStringInterface>(fragment: DocumentFragment): TemplateFactory<T>;
    private static createElementSet;
    private static createTreeNode;
}

export declare interface View<T> extends RootNode<T> {
    readonly root: ViewNode<T>;
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    onUpdated(): Observable<ViewNodeUpdate<T>>;
}

export declare interface ViewNode<T> extends RootNode<T> {
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

export declare interface ViewNode<T> {
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    onUpdated(): Observable<ViewNodeUpdate<T>>;
}

export declare interface ViewNodeSelectionChange<T> {
    selected: boolean;
    node: ViewNode<T>;
}

export declare interface ViewNodeUpdate<T> {
    data: T;
    previous: T;
    node: ViewNode<T>;
}

export declare interface ViewNodeVisibilityChange<T> {
    visible: boolean;
    node: ViewNode<T>;
}

export { }
