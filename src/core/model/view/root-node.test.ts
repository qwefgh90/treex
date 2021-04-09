import { Tree } from "../tree/tree";
import { NodeProp } from "./node-prop";

describe("root node for Tree class", () => {
    const node6: NodeProp<string> = {
        data: "",
        children: undefined
    }
    const node5: NodeProp<string> = {
        data: "node5",
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
        data: "root",
        children: [node2, node3]
    }

    let tree: Tree<string>;

    beforeEach(() => {
        tree = Tree.createTree(node1);
    });
    
    test("contains()", () => {
        expect(tree.contains(tree.root.children[1].children[0])).toBeTruthy();
    });

    test("find()", () => {
        expect(tree.find(node => node.data == tree.root.children[1].children[0].data)).toBeDefined();
        expect(tree.find(node => node.data == "NOT_FOUND_DATA")).toBeUndefined();
    });

    test("getNodes()", () => {
        expect(tree.getNodes().length).toBe(6);
        expect(tree.getNodes("bfs").length).toBe(6);
        expect(tree.getNodes("dfs").length).toBe(6);
        expect(tree.getNodes(0).length).toBe(1);
        expect(tree.getNodes(1).length).toBe(2);
        expect(tree.getNodes(2).length).toBe(2);
        expect(tree.getNodes(3).length).toBe(1);
    });
    test("height", () => {
        expect(tree.height).toBe(4);
    });
});

describe("root node for Node class", () => {
    const node6: NodeProp<string> = {
        data: "node6",
        children: undefined
    }
    const node5: NodeProp<string> = {
        data: "node5",
        children: undefined
    }
    const node4: NodeProp<string> = {
        data: "node4",
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
        data: "root",
        children: [node2, node3]
    }

    let tree: Tree<string>;

    beforeEach(() => {
        tree = Tree.createTree(node1);
    });
    
    test("contains()", () => {
        const node4 = tree.root.children[0].children[0];
        const node6 = tree.root.children[0].children[0].children[0];
        expect(node4.contains(node6)).toBeTruthy();
    });

    test("find() to find itself, child, a node which is not below it", () => {
        const node4 = tree.root.children[0].children[0];
        const node6 = tree.root.children[0].children[0].children[0];
        expect(node4.find(node => node.data == "node4")).toBe(node4);
        expect(node4.find(node => node.data == "node6")).toBe(node6);
        expect(node4.find(node => node.data == "NOT_FOUND_DATA")).toBeUndefined();
    });

    test("getNodes()", () => {
        const node4 = tree.root.children[0].children[0];
        expect(node4.getNodes().length).toBe(2);
        expect(node4.getNodes("bfs").length).toBe(2);
        expect(node4.getNodes("dfs").length).toBe(2);
        expect(node4.getNodes(0).length).toBe(1);
        expect(node4.getNodes(1).length).toBe(1);
        expect(node4.getNodes(2).length).toBe(0);
    });
    
    test("height", () => {
        const node6 = tree.root.children[0].children[0].children[0];
        expect(tree.root.height).toBe(4);
        expect(tree.root.children[0].height).toBe(3);
        expect(node6.height).toBe(1);
    });
});