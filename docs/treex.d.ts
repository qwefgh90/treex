import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/**
 * When one child is added to a child list, it's emitted.
 * @public
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
     * @deprecated Use {@link TreeNode.children | the children property} instead of it.
     * A new child list after adding a node.
     */
    children: ReadonlyArray<TreeNode<T>>;
}

/**
 * There are some events every node must emit when something changes on children.
 * @public
 * @typeParam T - a type of data which this event's node contains
 */
export declare type ChildChangeEvent<T> = ChildAddedEvent<T> | ChildRemovedEvent<T> | ChildInitializedEvent<T>;

/**
 * When a child list is initialized first, it's emitted.
 * @public
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
     * @deprecated Use {@link TreeNode.children | the children property} instead of it.
     * A new child list which has just been initialized
     */
    children: ReadonlyArray<TreeNode<T>>;
}

/**
 * When one child is removed to a child list, it's emitted.
 * @public
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
     * @deprecated Use {@link TreeNode.children | the children property} instead of it.
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
 * @public
 */
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
 * There are some event emitters. one of them emits events when detecting changes in child nodes.
 * It can be a contract for developers to build treex.
 * @public
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
 * @public
 */
export declare interface NodeProp<T> {
    /**
     * Data to have
     */
    data: T;
    /**
     * A child list
     */
    children?: NodeProp<T>[];
}

/**
 * Every node works as a root of a subtree.
 *
 * @remarks
 *
 * It has limited APIs which a root node must have and provide to developers.
 * @public
 * @typeParam T - a type of data which this node contains
 */
export declare interface RootNode<T> {
    /**
     * A height of a tree.
     */
    readonly height: number;
    /**
     * It returns an array of all descendants with bfs or dfs.
     * {@label OVERLOAD_1}
     * @returns An array of all descendants
     */
    getNodes(): RootNode<T>[];
    /**
     * It returns an array of all descendants on a specific level
     * {@label OVERLOAD_2}
     * @param level - a level which children are on
     * @returns An array of descendants on the level
     */
    getNodes(level: number): RootNode<T>[];
    /**
     * It returns an array of all descendants with a specific algorithm
     * {@label OVERLOAD_3}
     * @param strategy - a algorithm about how to traverse a tree
     * @returns An array of all descendants
     */
    getNodes(strategy: "bfs" | "dfs"): RootNode<T>[];
    /**
     * It lets us know whether a node exists in a tree.
     * @param node - a node to check
     * @returns return true if a node exists in the tree, otherwise return false.
     */
    contains(node: RootNode<T>): boolean;
    /**
     * It tries to visit every node and apply a predicate to each node.
     * When a result value of executing the predicate with a node is true, It stops visiting and return that node.
     * @returns return a node if a predicate return true, otherwise reutrn undefined.
     * @param predicate - a predicate which is used to find a node
     */
    find(predicate: (node: RootNode<T>) => boolean): RootNode<T> | undefined;
}

/**
 * @public
 */
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
    private extendedConnector;
    private extendedFragment;
}

export declare type ToStringInterface = Pick<string, "toString">;

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

/**
 * @public
 */
export declare interface TreeOption<T> {
    document: Document;
    templateFactory?: TemplateFactory<T>;
    hiddenRoot?: boolean;
}

/**
 * TreeResource is a tree's singleton object to manage all events emitted by leaves in a same tree with RxJS.
 * And subjects in a tree resource are unique pipes used for leaf nodes to propagate their events to parent nodes
 *
 * @remarks
 *
 * If every leaf has its own subject, duplicate resources waste the memory and it can't be easily managed by parents.
 * @public
 */
export declare interface TreeResource<T> {
    _removedSubject: Subject<TreeNode<T>>;
    _visibilityChangeSubject: Subject<ViewNodeVisibilityChange<T>>;
    _nodeUpdatedSubject: Subject<ViewNodeUpdate<T>>;
    _selectionSubject: Subject<ViewNodeSelectionChange<T>>;
    _childChangeSubject: Subject<ChildChangeEvent<T>>;
}

/**
 * @public
 */
export declare class TreeX {
    static createTree<T extends ToStringInterface>(tree: Tree<T>, option?: TreeOption<T>): HTMLElement;
    static templateFactory<T>(fragment: DocumentFragment, connector: (fragment: DocumentFragment, node: TreeNode<T>) => void): TemplateFactory<T>;
    static templateFactory<T extends ToStringInterface>(fragment: DocumentFragment): TemplateFactory<T>;
    private static createElementSet;
    private static createTreeNode;
}

/**
 * A simple interface for providing a few APIs which a tree must have.
 * @public
 */
export declare interface View<T> extends RootNode<T> {
    /**
     * A root node in this tree
     */
    readonly root: ViewNode<T>;
    /**
     * visibility events captured by all nodes
     */
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    /**
     * selection events captured by all nodes
     */
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    /**
     * update events captured by all nodes
     */
    onUpdated(): Observable<ViewNodeUpdate<T>>;
}

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
export declare interface ViewNode<T> extends RootNode<T> {
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
 * An event interface for selection
 * @public
 */
export declare interface ViewNodeSelectionChange<T> {
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
 * An event interface for updated data
 * @public
 */
export declare interface ViewNodeUpdate<T> {
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
 * An event interface for visibility
 * @public
 */
export declare interface ViewNodeVisibilityChange<T> {
    /**
     * current status of visibility
     */
    visible: boolean;
    /**
     * A node where a change happens
     */
    node: ViewNode<T>;
}

export { }
