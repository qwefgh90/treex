import { NodeProp } from "../view/node-prop";
import { Tree } from "./tree";

test("create tree", () => {
    const node2: NodeProp<string> = {
        data: "",
        children: undefined
    }
    const node1: NodeProp<string> = {
        data: "",
        children: [node2]
    }
    const tree1 = Tree.createTree(node1);
    expect(tree1).toBeDefined();
});

describe("basic operations of Tree ", () => {
    const node6: NodeProp<string> = {
        data: "",
        children: undefined
    }
    const node5: NodeProp<string> = {
        data: "",
        children: undefined
    }
    const node4: NodeProp<string> = {
        data: "",
        children: [node6]
    }
    const node3: NodeProp<string> = {
        data: "",
        children: [node5]
    }
    const node2: NodeProp<string> = {
        data: "",
        children: [node4]
    }
    const node1: NodeProp<string> = {
        data: "",
        children: [node2, node3]
    }
    let tree: Tree<string>;
    beforeEach(() => {
        tree = Tree.createTree(node1);
    });
});
