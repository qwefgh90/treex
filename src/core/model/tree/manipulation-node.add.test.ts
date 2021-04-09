
import { Subscription } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { Tree } from "./tree";

describe("functions to change children", () => {
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
        data: "node2",
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

    test("add a invalid child", () => {
        expect(tree.root.appendBefore({data:"invalid"})).toBeFalsy();
        expect(tree.root.appendAfter({data:"invalid"})).toBeFalsy();
    });
});