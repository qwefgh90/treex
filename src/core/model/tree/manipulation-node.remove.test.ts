
import { Subscription } from "rxjs";
import { NodeProp } from "../view/node-prop";
import { Tree } from "./tree";

describe("functions to remove children", () => {
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

    test("remove itself", (done) => {
        const previousLen = tree.root.children.length;
        const previousHeight = tree.root.height;
        const removedNode = tree.root.children[0];
        tree.root.children[0].onRemoved().then((e) => {
            expect(e).toBe(removedNode);
            done();
        })
        tree.root.children[0].remove();
        expect(previousLen).toBe(2);
        expect(previousHeight).toBe(4);
        expect(tree.root.children.length).toBe(1);
        expect(tree.root.height).toBe(3);
    });

    test("remove a child", (done) => {
        const previousLen = tree.root.children.length;
        const previousHeight = tree.root.height;
        const removedNode = tree.root.children[0];
        tree.root.children[0].onRemoved().then((e) => {
            expect(e).toBe(removedNode);
            done();
        })
        tree.root.removeChild(tree.root.children[0]);
        expect(previousLen).toBe(2);
        expect(previousHeight).toBe(4);
        expect(tree.root.children.length).toBe(1);
        expect(tree.root.height).toBe(3);
    });

    test("remove all children", (done) => {
        let removeCount =0;
        const removedNode1 = tree.root.children[0];
        const removedNode2 = tree.root.children[1];
        tree.root.children[0].onRemoved().then((e) => {
            expect(e).toBe(removedNode1);
            removeCount++;
        })
        tree.root.children[1].onRemoved().then((e) => {
            expect(e).toBe(removedNode2);
            removeCount++;
            if(removeCount == 2)
                done();
        })
        tree.root.removeAllChildren();
        const len = tree.root.children.length;
        expect(len).toBe(0);
        expect(tree.root.height).toBe(1);
    });
    
    test("remove invalid node", () => {
        expect(tree.root.remove()).toBeFalsy();
    });

});
