<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [treex.js](./treex.js.md)

## treex.js package

## Classes

|  Class | Description |
|  --- | --- |
|  [TemplateFactory](./treex.js.templatefactory.md) |  |
|  [Tree](./treex.js.tree.md) | A Tree is a core unit to construct a new tree with leaves. It watches changes of all leaf nodes and can traverse leaves. A resource is an important property which is marked as private to manage all leaf nodes. |
|  [TreeNode](./treex.js.treenode.md) | A TreeNode is a basic unit to construct a leaf in a tree. The instantiation of [TreeNode](./treex.js.treenode.md) is usually done through [Tree.createTree()](./treex.js.tree.createtree.md) or some methods with [NodeProp](./treex.js.nodeprop.md)<!-- -->. It provides fluent APIs and support a type parameter for data. |
|  [TreeX](./treex.js.treex.md) |  |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [ChildAddedEvent](./treex.js.childaddedevent.md) | When one child is added to a child list, it's emitted. |
|  [ChildInitializedEvent](./treex.js.childinitializedevent.md) | When a child list is initialized first, it's emitted. |
|  [ChildRemovedEvent](./treex.js.childremovedevent.md) | When one child is removed to a child list, it's emitted. |
|  [ManipulationNode](./treex.js.manipulationnode.md) | It's an interface to provide APIs which manipulate a node for developers. There are some event emitters. one of them emits events when detecting changes in child nodes. It can be a contract for developers to build treex. |
|  [NodeProp](./treex.js.nodeprop.md) | A simple interface which contains information to make a node |
|  [RootNode](./treex.js.rootnode.md) | Every node works as a root of a subtree. |
|  [TreeOption](./treex.js.treeoption.md) |  |
|  [TreeResource](./treex.js.treeresource.md) | TreeResource is a tree's singleton object to manage all events emitted by leaves in a same tree with RxJS. And subjects in a tree resource are unique pipes used for leaf nodes to propagate their events to parent nodes |
|  [View](./treex.js.view.md) | A simple interface for providing a few APIs which a tree must have. |
|  [ViewNode](./treex.js.viewnode.md) | It defines APIs which a node in a tree should have. Some APIs are usually not provided in other libraries. There are [ViewNode.selectedNodes](./treex.js.viewnode.selectednodes.md)<!-- -->, [ViewNode.select()](./treex.js.viewnode.select.md)<!-- -->, [ViewNode.deselect()](./treex.js.viewnode.deselect.md)<!-- -->, [ViewNode.setVisibility()](./treex.js.viewnode.setvisibility.md) Because they are so useful and easy to implement, they are implimented with their own state. It contains also observables to observe changes of [ViewNodeUpdate](./treex.js.viewnodeupdate.md) and [ViewNodeSelectionChange](./treex.js.viewnodeselectionchange.md) and [ViewNodeVisibilityChange](./treex.js.viewnodevisibilitychange.md)<!-- -->. |
|  [ViewNodeSelectionChange](./treex.js.viewnodeselectionchange.md) | An event interface for selection |
|  [ViewNodeUpdate](./treex.js.viewnodeupdate.md) | An event interface for updated data |
|  [ViewNodeVisibilityChange](./treex.js.viewnodevisibilitychange.md) | An event interface for visibility |

## Variables

|  Variable | Description |
|  --- | --- |
|  [classNameMap](./treex.js.classnamemap.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [ChildChangeEvent](./treex.js.childchangeevent.md) | There are some events every node must emit when something changes on children. |
|  [ToStringInterface](./treex.js.tostringinterface.md) |  |

