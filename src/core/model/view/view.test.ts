import { Subscription } from "rxjs";
import { Tree } from "../tree/tree";
import { NodeProp } from "./node-prop";

describe("Basic operations of View", () => {
    const node6: NodeProp<string> = {
        data: "1",
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
        data: "1",
        children: [node5]
    }
    const node2: NodeProp<string> = {
        data: "",
        children: [node4]
    }
    const node1: NodeProp<string> = {
        data: "rooT!!",
        children: [node2, node3]
    }

    let tree: Tree<string>;
    let subscriptions: Subscription[] = [];
    beforeEach(() => {
        tree = Tree.createTree(node1);
    });

    afterEach(() => {
        subscriptions.forEach((s) => s.unsubscribe());
    });
    test("root", () => {
        expect(tree.root.data).toBe(node1.data);
        expect(tree.root.children.length).toBe(2);
    });
});
