<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [treex](./treex.md) &gt; [ChildAddedEvent](./treex.childaddedevent.md)

## ChildAddedEvent interface

When one child is added to a child list, it's emitted.

<b>Signature:</b>

```typescript
export interface ChildAddedEvent<T> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [ADDED](./treex.childaddedevent.added.md) | "ADDED" | To distinguish other events, existence of this property is checked. |
|  [addedNode](./treex.childaddedevent.addednode.md) | [TreeNode](./treex.treenode.md)<!-- -->&lt;T&gt; | A added node. |
|  [children](./treex.childaddedevent.children.md) | ReadonlyArray&lt;[TreeNode](./treex.treenode.md)<!-- -->&lt;T&gt;&gt; |  |
|  [index](./treex.childaddedevent.index.md) | number | A new index of a added node in a child list. |
|  [node](./treex.childaddedevent.node.md) | [TreeNode](./treex.treenode.md)<!-- -->&lt;T&gt; | A node which a added node belonged to. |
