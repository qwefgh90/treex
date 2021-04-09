import { Subscription } from "rxjs";
import { Tree } from "../tree/tree";
import { NodeProp } from "../view/node-prop";

describe("events of Tree", () => {
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
    
    test("onSelectionChange occur", (done) => {
        let clickCount = 0;
        tree.onSelectionChange().subscribe((e) => {
            expect(e.selected).toBeTruthy();
            clickCount++;
            if(clickCount == 3){
                done();
            }
        });
        tree.root.select();
        tree.root.children[0].select();
        tree.root.children[1].select();
        //TODO: onSelected
    });
    test("onVisibilityChange occur", (done) => {
        tree.root.children[1].setVisibility(false);
        let changeCount = 0;
        tree.onVisibilityChange().subscribe((e) => {
            changeCount++;
            if(changeCount == 2){
                done();
            }
        });
        tree.root.children[1].setVisibility(false);
        tree.root.setVisibility(false);
    });
    test("onUpdated occur", (done) => {
        const previous = tree.root.data;
        const current = "hello!";
        tree.onUpdated().subscribe((e) => {
            expect(e.previous).toBe(previous);
            expect(e.data).toBe(current);
            done();
        })
        tree.root.data = current;
    });
    test("onRemoved occur", (done) => {
        const node4 = tree.root.children[0].children[0];
        tree.onRemoved().subscribe((e) => {
            expect(e).toBe(node4);
            done();
        })
        node4.remove();
    });
    test("onAdded occur", (done) => {
        const node4 = tree.root.children[0].children[0];
        tree.onAdded().subscribe((e) => {
            expect(e.node.data).toBe("newnode");
            done();
        })
        node4.appendChild({data: "newnode"});
    });
});
