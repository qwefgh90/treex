/**
 * Every node works as a root of a subtree.
 *
 * @remarks
 *
 * It has limited APIs which a root node must have and provide to developers.
 * @public
 * @typeParam T - a type of data which this node contains
 */
export interface RootNode<T> {
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
//# sourceMappingURL=root-node.d.ts.map