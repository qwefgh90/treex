<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [treex](./treex.md) &gt; [ViewNode](./treex.viewnode.md)

## ViewNode interface

It defines APIs which a node in a tree should have. Some APIs are usually not provided in other libraries. There are [ViewNode.selectedNodes](./treex.viewnode.selectednodes.md)<!-- -->, [ViewNode.select()](./treex.viewnode.select.md)<!-- -->, [ViewNode.deselect()](./treex.viewnode.deselect.md)<!-- -->, [ViewNode.setVisibility()](./treex.viewnode.setvisibility.md) Because they are so useful and easy to implement, they are implimented with their own state. It contains also observables to observe changes of [ViewNodeUpdate](./treex.viewnodeupdate.md) and [ViewNodeSelectionChange](./treex.viewnodeselectionchange.md) and [ViewNodeVisibilityChange](./treex.viewnodevisibilitychange.md)<!-- -->.

<b>Signature:</b>

```typescript
export interface ViewNode<T> extends RootNode<T> 
```
<b>Extends:</b> [RootNode](./treex.rootnode.md)<!-- -->&lt;T&gt;

## Remarks

APIs for selection and visibility don't have side effects to its tree and other nodes. Some side effects would degrade operation performance.

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [children](./treex.viewnode.children.md) | ReadonlyArray&lt;[ViewNode](./treex.viewnode.md)<!-- -->&lt;T&gt;&gt; | A child list. |
|  [data](./treex.viewnode.data.md) | T | A data this node contains. |
|  [parent](./treex.viewnode.parent.md) | [ViewNode](./treex.viewnode.md)<!-- -->&lt;T&gt; \| "tree" \| undefined | If this node is a root, the parent property must be "tree". If this node a node which is not a root and in a tree, it must be a existing node. Otherwise, it must be undefined and this node isn't belonging to a tree. |
|  [path](./treex.viewnode.path.md) | string | A string representation of this node's location. |
|  [prop](./treex.viewnode.prop.md) | [NodeProp](./treex.nodeprop.md)<!-- -->&lt;T&gt; | A initial data which was provided when a node was created. |
|  [selected](./treex.viewnode.selected.md) | boolean | Whether it is selected. |
|  [selectedNodes](./treex.viewnode.selectednodes.md) | [ViewNode](./treex.viewnode.md)<!-- -->&lt;T&gt;\[\] | A list of selected nodes. |
|  [visibility](./treex.viewnode.visibility.md) | boolean | Whether it is visible. |

## Methods

|  Method | Description |
|  --- | --- |
|  [bfs(predicate, stopWhenFound)](./treex.viewnode.bfs.md) | Initially, it was deisgned to traverse a tree. And two parameters were added newly to satisfy requirements without a performance loss. It was required to remove some nodes from a result and stop it when the predicate returns true during traversing the tree. |
|  [deselect()](./treex.viewnode.deselect.md) | Deselect this node. |
|  [onSelectionChange()](./treex.viewnode.onselectionchange.md) | It's a event listener on changes of selection status. |
|  [onUpdated()](./treex.viewnode.onupdated.md) | It's a event listener on changes of data. |
|  [onVisibilityChange()](./treex.viewnode.onvisibilitychange.md) | It's a event listener on changes of visibility status. |
|  [select()](./treex.viewnode.select.md) | Select this node. |
|  [setVisibility(visible)](./treex.viewnode.setvisibility.md) | Set the visibility of this node. |
