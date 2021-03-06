<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [treex.js](./treex.js.md) &gt; [RootNode](./treex.js.rootnode.md)

## RootNode interface

Every node works as a root of a subtree.

<b>Signature:</b>

```typescript
export interface RootNode<T> 
```

## Remarks

It has limited APIs which a root node must have and provide to developers.

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [height](./treex.js.rootnode.height.md) | number | A height of a tree. |

## Methods

|  Method | Description |
|  --- | --- |
|  [contains(node)](./treex.js.rootnode.contains.md) | It lets us know whether a node exists in a tree. |
|  [find(predicate)](./treex.js.rootnode.find.md) | It tries to visit every node and apply a predicate to each node. When a result value of executing the predicate with a node is true, It stops visiting and return that node. |
|  [getNodes()](./treex.js.rootnode.getnodes.md) | It returns an array of all descendants with bfs or dfs.  |
|  [getNodes(level)](./treex.js.rootnode.getnodes_1.md) | It returns an array of all descendants on a specific level  |
|  [getNodes(strategy)](./treex.js.rootnode.getnodes_2.md) | It returns an array of all descendants with a specific algorithm  |

