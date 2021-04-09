import { ViewNode, ViewNodeSelectionChange, ViewNodeUpdate, ViewNodeVisibilityChange } from "../view/view-node"
import { Subject } from "rxjs";
import { ChildChangeEvent } from "./manipulation-node";
import { TreeNode } from "./node"
export interface TreeResource<T> {
    _removedSubject: Subject<TreeNode<T>>,
    _visibilityChangeSubject: Subject<ViewNodeVisibilityChange<T>>,
    _nodeUpdatedSubject: Subject<ViewNodeUpdate<T>>,
    _selectionSubject: Subject<ViewNodeSelectionChange<T>>,
    _childChangeSubject: Subject<ChildChangeEvent<T>>
}