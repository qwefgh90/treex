import { ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node";
import { Subject } from "rxjs";
import { ChildChangeEvent } from "./manipulation-node";
import { TreeNode } from "./node";
/**
 * TreeResource is a tree's singleton object to manage all events emitted by leaves in a same tree with RxJS.
 * And subjects in a tree resource are unique pipes used for leaf nodes to propagate their events to parent nodes
 *
 * @remarks
 *
 * If every leaf has its own subject, duplicate resources waste the memory and it can't be easily managed by parents.
 * @public
 */
export interface TreeResource<T> {
    _removedSubject: Subject<TreeNode<T>>;
    _visibilityChangeSubject: Subject<ViewNodeVisibilityChange<T>>;
    _nodeUpdatedSubject: Subject<ViewNodeUpdate<T>>;
    _selectionSubject: Subject<ViewNodeSelectionChange<T>>;
    _childChangeSubject: Subject<ChildChangeEvent<T>>;
}
//# sourceMappingURL=tree-resource.d.ts.map