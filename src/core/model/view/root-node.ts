/**
 * to make all nodes to work as root 
 * under the specific condition
 */
export interface RootNode<T>{
    readonly height: number;
    getNodes(): RootNode<T>[];
    getNodes(level: number): RootNode<T>[];
    getNodes(strategy: "bfs" | "dfs"): RootNode<T>[];
    contains(node: RootNode<T>): boolean;
    find(predicate: (node: RootNode<T>) => boolean): RootNode<T> | undefined;
}