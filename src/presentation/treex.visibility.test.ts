import { Tree } from "../core/model/tree/tree";
import { NodeProp } from "../core/model/view/node-prop";
import { classNameMap, TreeX } from "./treex";

jest.useFakeTimers();
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

test("default icon visibility", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    expect(treeEl.querySelectorAll(`.${classNameMap.expandIconClass}.${classNameMap.noneClass}`).length).toBe(6);
    expect(treeEl.querySelectorAll(`.${classNameMap.hiddenClass}`).length).toBe(4);
});

test("icon visibility when appending to leaf node", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    expect(treeEl.querySelectorAll(`.${classNameMap.collapseIconClass}:not(.${classNameMap.noneClass}):not(.${classNameMap.hiddenClass})`).length).toBe(4);

    let node = tree.getNodes().pop();
    node?.appendChild({ data: "new child!" });
    jest.advanceTimersByTime(100);
    expect(treeEl.querySelectorAll(`.${classNameMap.collapseIconClass}:not(.${classNameMap.noneClass}):not(.${classNameMap.hiddenClass})`).length).toBe(5);
    expect(treeEl.querySelectorAll(`.${classNameMap.hiddenClass}`).length).toBe(4);
});

test("set false to visibility", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    tree.find((node) =>
        node.data == "Node5"
    )?.setVisibility(false);
    jest.advanceTimersByTime(100);
    let outerList = Array.from(treeEl.querySelectorAll(`.${classNameMap.outerClass}`)) as HTMLDivElement[];
    expect(outerList.filter(div => div.classList.contains(classNameMap.noneClass)).length).toBe(1);
});

test("hide root", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document, hiddenRoot: true });
    document.body.appendChild(treeEl);
    jest.advanceTimersByTime(100);
    expect(treeEl.querySelectorAll(`.${classNameMap.nodeBoxClass}.${classNameMap.noneClass}`).length).toBe(1);
    expect(treeEl.querySelectorAll(`.${classNameMap.nodeBoxClass}.${classNameMap.noneClass}`).item(0)).toBe(treeEl.firstElementChild?.firstElementChild);
});


test("set true to visibility", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    tree.find((node) =>
        node.data == "Root"
    )?.setVisibility(false);
    tree.find((node) =>
        node.data == "Node5"
    )?.setVisibility(true);
    jest.advanceTimersByTime(100);
    let outerList = Array.from(treeEl.querySelectorAll(`.${classNameMap.outerClass}`)) as HTMLDivElement[];
    expect(outerList.filter(div => getComputedStyle(div).display == "none").length).toBe(0);
});

test("set hidden to all children when click collapse icon", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    let collapse = Array.from(treeEl.querySelectorAll(`.${classNameMap.collapseIconClass}:not(.${classNameMap.hiddenClass})`)) as HTMLSpanElement[];
    let expand = Array.from(treeEl.querySelectorAll(`.${classNameMap.expandIconClass}.${classNameMap.noneClass}`)) as HTMLSpanElement[];
    expect(collapse.length).toBe(4);
    expect(expand.length).toBe(6);
    collapse[0].click();
    jest.advanceTimersByTime(100);
    tree.root.children.forEach(n => expect(n.visibility).toBeFalsy());
    expand[0].click();
    jest.advanceTimersByTime(100);
    tree.root.children.forEach(n => expect(n.visibility).toBeTruthy());
});

test("update icons when visibility changes", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    let collapse = Array.from(treeEl.querySelectorAll(`.${classNameMap.collapseIconClass}:not(.${classNameMap.hiddenClass})`)) as HTMLSpanElement[];
    let visibleExpand = Array.from(treeEl.querySelectorAll(`.${classNameMap.expandIconClass}:not(.${classNameMap.noneClass})`)) as HTMLSpanElement[];

    expect(collapse.length).toBe(4);
    expect(visibleExpand.length).toBe(0);

    collapse[1].click();
    jest.advanceTimersByTime(100);
    visibleExpand = Array.from(treeEl.querySelectorAll(`.${classNameMap.expandIconClass}:not(.${classNameMap.noneClass})`)) as HTMLSpanElement[];
    expect(visibleExpand.length).toBe(1);
    expect(tree.root.getNodes().filter(n => n.visibility == false).length).toBe(1);

    tree.root.children[0].children[0].children[0].setVisibility(true);
    jest.advanceTimersByTime(100);
    visibleExpand = Array.from(treeEl.querySelectorAll(`.${classNameMap.expandIconClass}:not(.${classNameMap.noneClass})`)) as HTMLSpanElement[];
    expect(visibleExpand.length).toBe(0);
    expect(tree.root.getNodes().filter(n => n.visibility == false).length).toBe(0);
});

