import { Observable } from "rxjs";
import { RootNode } from "./root-node";
import { ViewNode, ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "./view-node";
export interface View<T> extends RootNode<T> {
    readonly root: ViewNode<T>;
    onVisibilityChange(): Observable<ViewNodeVisibilityChange<T>>;
    onSelectionChange(): Observable<ViewNodeSelectionChange<T>>;
    onUpdated(): Observable<ViewNodeUpdate<T>>;
}
//# sourceMappingURL=view.d.ts.map