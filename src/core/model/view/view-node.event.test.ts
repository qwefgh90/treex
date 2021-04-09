import { Subscription } from "rxjs";
import { Tree } from "../tree/tree";
import { NodeProp } from "./node-prop";

describe("get, remove the node", () => {
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
        data: "data",
        children: [node4]
    }
    const node1: NodeProp<string> = {
        data: "",
        children: [node2, node3]
    }
    let tree: Tree<string>;
    let subscriptions: Subscription[] = [];
    beforeEach(() => {
        tree = Tree.createTree(node1);
    });

    afterEach(() => {
        subscriptions.forEach(s => s.unsubscribe());
    })

    test("onSelectionChange occur", (done) => {
        let clickCount = 0;
        tree.root.onSelectionChange().subscribe((e) => {
            expect(e.selected).toBeTruthy();
            expect(e.node).toBe(tree.root);
            clickCount++;
        });
        tree.root.children[0].onSelectionChange().subscribe((e) => {
            expect(e.selected).toBeTruthy();
            expect(e.node).toBe(tree.root.children[0]);
            clickCount++;
        });
        tree.root.children[1].onSelectionChange().subscribe((e) => {
            expect(e.node).toBe(tree.root.children[1]);
            clickCount++;
            if(clickCount == 4)
                done();
        });
        tree.root.select();
        tree.root.children[0].select();
        tree.root.children[1].select();
        tree.root.children[1].deselect();
    });
    test("onVisibilityChange occur", (done) => {
        tree.root.children[1].setVisibility(false);
        tree.root.children[1].onVisibilityChange().subscribe((e) => {
            expect(e.visible).toBe(false);
            expect(e.node).toBe(tree.root.children[1]);
            done();
        });
        tree.root.children[1].setVisibility(false);
    });
    test("onUpdated occur", (done) => {
        const previous = tree.root.data;
        const current = "hello!";
        tree.root.onUpdated().subscribe((e) => {
            expect(e.previous).toBe(previous);
            expect(e.data).toBe(current);
            expect(e.node).toBe(tree.root);
            done();
        })
        tree.root.data = current;
    });
});