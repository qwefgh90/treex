import { Tree } from "../tree/tree";
import { NodeProp } from "./node-prop";

describe("functions", () => {
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

    test("prop", () => {
        const prop = tree.root.prop;
        expect(prop.data).toBe(tree.root.data);
    });

    test("update data", (done) => {
        const previous = tree.root.data;
        tree.root.onUpdated().subscribe((e) => {
            expect(e.previous).toBe(previous);
            expect(e.data).toBe("hello");
            done()
        });
        tree.root.data = "hello";
        expect(tree.root.data).toBe("hello");
    });

    test("selectedNodes", () => {
        tree.root.select();
        tree.root.children[0].select();
        tree.root.children[0].children[0].select();
        expect(tree.root.selectedNodes.length).toBe(3);
        expect(tree.root.children[0].selectedNodes.length).toBe(2);
    });

    test("get parent node", () => {
        expect(tree.root.parent).toBe("tree");
        expect(tree.root.children[0].parent).toBe(tree.root);
    });

    test("selected", (() => {
        tree.root.select();
        expect(tree.root.selected).toBeTruthy();
        tree.root.deselect();
        expect(tree.root.selected).toBeFalsy();
    }));

    test("visibility", (() => {
        tree.root.setVisibility(true);
        expect(tree.root.visibility).toBeTruthy();
        tree.root.setVisibility(false);
        expect(tree.root.visibility).toBeFalsy();
    }));

    //TODO: path

});
//TODO: if a node is removed, how does a viewNode work?