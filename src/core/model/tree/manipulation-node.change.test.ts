
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

    test("change event when remove a child", (done) => {
        const removedNode = tree.root.children[0];
        tree.root.onChildChanged().subscribe((e) => {
            console.debug("changed!" + e);
            if("REMOVED" in e){
                expect(e.oldIndex).toBe(0);
                expect(e.oldChildren.length).toBe(2);
                expect(e.children.length).toBe(1);
                expect(e.node).toBe(tree.root);
                expect(e.removedNode).toBe(removedNode);
                done();
            }
        });
        tree.root.removeChild(tree.root.children[0]);
    });

    test("change event when remove all children", (done) => {
        let removedCount = 0;
        tree.root.onChildChanged().subscribe((e) => {
            if("REMOVED" in e){
                removedCount++;
                if(removedCount == 2){
                    done();
                }
            }
        });
        tree.root.removeAllChildren();
    });

    test("change event when add a child", (done) => {
        tree.root.onChildChanged().subscribe((e) => {
            console.debug("changed!" + e);
            if("ADDED" in e){
                expect(e.addedNode.data).toBe("newnode");
                expect(e.children.length).toBe(3);
                expect(e.node).toBe(tree.root);
                expect(e.index).toBe(2);
                done();
            }
        });
        tree.root.appendChild({data: "newnode"});
    });
    test("change event when add a child", (done) => {
        const node2 = tree.root.children[0];
        tree.root.onChildChanged().subscribe((e) => {
            console.debug("changed!" + e);
            if("ADDED" in e){
                expect(e.addedNode.data).toBe("newnode");
                expect(e.children.length).toBe(3);
                expect(e.node).toBe(tree.root);
                expect(e.index).toBe(1);
                expect(tree.root.children[0].data).toBe(node2.data);
                expect(tree.root.children[1].data).toBe("newnode");
                done();
            }
        });
        node2.appendAfter({data: "newnode"});
    });
    test("change event when add a child", (done) => {
        const node2 = tree.root.children[0];
        tree.root.onChildChanged().subscribe((e) => {
            console.debug("changed!" + e);
            if("ADDED" in e){
                expect(e.addedNode.data).toBe("newnode");
                expect(e.children.length).toBe(3);
                expect(e.node).toBe(tree.root);
                expect(e.index).toBe(0);
                expect(tree.root.children[1].data).toBe(node2.data);
                expect(tree.root.children[0].data).toBe("newnode");
                done();
            }
        });
        node2.appendBefore({data: "newnode"});
    });
    test("change event when add a child", (done) => {
        const node3 = tree.root.children[1];
        tree.root.onChildChanged().subscribe((e) => {
            console.debug("changed!" + e);
            if("ADDED" in e){
                expect(e.addedNode.data).toBe("newnode");
                expect(e.children.length).toBe(3);
                expect(e.node).toBe(tree.root);
                expect(e.index).toBe(2);
                expect(tree.root.children[1].data).toBe(node3.data);
                expect(tree.root.children[2].data).toBe("newnode");
                done();
            }
        });
        node3.appendAfter({data: "newnode"});
    });
    test("change event when add a child", (done) => {
        const node3 = tree.root.children[1];
        tree.root.onChildChanged().subscribe((e) => {
            console.debug("changed!" + e);
            if("ADDED" in e){
                expect(e.addedNode.data).toBe("newnode");
                expect(e.children.length).toBe(3);
                expect(e.node).toBe(tree.root);
                expect(e.index).toBe(1);
                expect(tree.root.children[2].data).toBe(node3.data);
                expect(tree.root.children[1].data).toBe("newnode");
                done();
            }
        });
        node3.appendBefore({data: "newnode"});
    });
});