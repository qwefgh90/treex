import { Tree } from "../core/model/tree/tree";
import { NodeProp } from "../core/model/view/node-prop";
import { classNameMap, TreeX } from "./treex";

let fragment: DocumentFragment;

const node6: NodeProp<string> = {
    data: "LEAF",
    children: undefined
}
const node5: NodeProp<string> = {
    data: "Node5",
    children: undefined
}
const node4: NodeProp<string> = {
    data: "A",
    children: [node6]
}
const node3: NodeProp<string> = {
    data: "Node3",
    children: [node5]
}
const node2: NodeProp<string> = {
    data: "A",
    children: [node4]
}
const node1: NodeProp<string> = {
    data: "Root",
    children: [node2, node3]
}

let tree: Tree<string>;

beforeEach(() => {
    fragment = document.createDocumentFragment();
    const outer = document.createElement('div');
    outer.innerHTML = `<input type="checkbox"/><div class="value"></div>`;
    fragment.append(...(Array.from(outer.childNodes)));
    tree = Tree.createTree(node1);
});

test("remove a node in treex", (done) => {
    const treex: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treex);
    tree.root.children[0].remove();
    setTimeout(() => {
        expect(treex.querySelectorAll(`.${classNameMap.valueClass}`).length).toBe(3);
        done();
    }, 100);
});

test("icon visibility when removing to leaf node", (done) => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    expect(treeEl.querySelectorAll(`.${classNameMap.collapseIconClass}:not(.${classNameMap.noneClass}):not(.${classNameMap.hiddenClass})`).length).toBe(4);

    let node = tree.getNodes().pop();
    expect(treeEl.querySelectorAll(`.${classNameMap.hiddenClass}`).length).toBe(4);
    node?.remove();
    setTimeout(() => {
        expect(treeEl.querySelectorAll(`.${classNameMap.collapseIconClass}:not(.${classNameMap.noneClass}):not(.${classNameMap.hiddenClass})`).length).toBe(3);
        expect(treeEl.querySelectorAll(`.${classNameMap.hiddenClass}`).length).toBe(4);
        done();
    }, 100);
});
