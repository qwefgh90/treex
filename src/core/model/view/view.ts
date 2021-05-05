import { Observable } from "rxjs";
import { RootNode } from "./root-node";
import { ViewNode, ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "./view-node";

/**
 * A simple interface for providing a few APIs which a tree must have.
 * @public
 */
export interface View<T> extends RootNode<T>{
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