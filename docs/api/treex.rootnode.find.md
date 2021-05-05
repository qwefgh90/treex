<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [treex](./treex.md) &gt; [RootNode](./treex.rootnode.md) &gt; [find](./treex.rootnode.find.md)

## RootNode.find() method

It tries to visit every node and apply a predicate to each node. When a result value of executing the predicate with a node is true, It stops visiting and return that node.

<b>Signature:</b>

```typescript
find(predicate: (node: RootNode<T>) => boolean): RootNode<T> | undefined;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  predicate | (node: [RootNode](./treex.rootnode.md)<!-- -->&lt;T&gt;) =&gt; boolean | a predicate which is used to find a node |

<b>Returns:</b>

[RootNode](./treex.rootnode.md)<!-- -->&lt;T&gt; \| undefined

return a node if a predicate return true, otherwise reutrn undefined.
