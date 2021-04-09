import { TreeNode } from "../core/model/tree/node";
import { Tree } from "../core/model/tree/tree";
import { NodeProp } from "../core/model/view/node-prop";
import { classNameMap, TemplateFactory, TreeX } from "./treex";

jest.useFakeTimers();
let fragment: DocumentFragment;

const node6: NodeProp<string> = {
    data: "LEAF",
    children: undefined
}
const node5: NodeProp<string> = {
    data: "A",
    children: undefined
}
const node4: NodeProp<string> = {
    data: "A",
    children: [node6]
}
const node3: NodeProp<string> = {
    data: "A",
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
    // fragment = document.createDocumentFragment();
    // const outer = document.createElement('div');
    // outer.innerHTML = `<input type="checkbox"/><div class="value"></div>`;
    // fragment.append(...(Array.from(outer.childNodes)));
    tree = Tree.createTree(node1);
});

test("create new treex", () => {
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);
    // let valueElement = treeEl.querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement;
    expect((treeEl.firstElementChild?.firstElementChild?.querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement).innerText).toBe("Root");
    expect(treeEl.querySelectorAll(`.${classNameMap.valueClass}`).length).toBe(6);
    expect(treeEl.firstElementChild?.firstElementChild?.classList.contains('node')).toBeTruthy;
    expect(treeEl.firstElementChild?.children[1].classList.contains('children')).toBeTruthy;
    expect(treeEl.firstElementChild?.children[1].childElementCount).toBe(2);
});
test("create treex with template including icons", () => {
    const fragment = document.createDocumentFragment();
    let collapse = document.createElement('div');
    let expand = document.createElement('div');
    let value = document.createElement('span');
    collapse.classList.add(classNameMap.collapseIconClass);
    expand.classList.add(classNameMap.expandIconClass);
    value.classList.add(classNameMap.valueClass);
    fragment.append(collapse, expand, value);
    const templateFactory = TreeX.templateFactory<string>(fragment); //TODO why should we pass explicit type?
    const treex: HTMLElement = TreeX.createTree(tree, { document, templateFactory });
    expect(treex.children[0].children[0].querySelectorAll(`.${classNameMap.collapseIconClass}`).length).toBe(1);
    expect(treex.children[0].children[0].querySelectorAll(`.${classNameMap.collapseIconClass}`).item(0).tagName).toBe("DIV");
    expect(treex.children[0].children[0].querySelectorAll(`.${classNameMap.expandIconClass}`).length).toBe(1);
    expect(treex.children[0].children[0].querySelectorAll(`.${classNameMap.expandIconClass}`).item(0).tagName).toBe("DIV");
});

test("select nodes in treex", () => {
    const treex: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treex);
    tree.root.children[0].select();
    tree.root.children[1].select();
    jest.advanceTimersByTime(100);
    // setTimeout(() => {
    expect(treex.querySelectorAll(`.${classNameMap.selectedClass}`).length).toBe(2);
    tree.root.children[1].deselect();
    // }, 1);
    jest.advanceTimersByTime(100);
    // setTimeout(() => {
    expect(treex.querySelectorAll(`.${classNameMap.selectedClass}`).length).toBe(1);
    // done();
    // }, 100);
});

test("update a node in treex", () => {
    const templateFactory: TemplateFactory<string> = TreeX.templateFactory(TemplateFactory.getDefaultFactory(document).fragment,
     (fragment: DocumentFragment, node: TreeNode<string>) => {
        let span = (fragment.querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement);
        node.onUpdated().subscribe((v) => {
            span.innerText = node.data;
        });
    });
    const treex: HTMLElement = TreeX.createTree(tree, { document, templateFactory });
    document.body.appendChild(treex);
    tree.root.data = "ROOT1";
    let valueElement = treex.querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement;
    expect(valueElement.innerText).toBe("ROOT1");
});

test("append node to treex", () => {
    const newNode: NodeProp<string> = {
        data: "new",
        children: undefined
    }
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);

    expect(treeEl.firstElementChild?.children[1].childElementCount)
        .toBe(2);
    tree.root.appendChild(newNode); //SIDE EFFECT

    expect(treeEl.firstElementChild?.children[1].childElementCount)
        .toBe(3);
    expect((treeEl.firstElementChild?.children[1]
        .children[2].querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement)
        .innerText)
        .toBe("new");

    tree.root.children[0].appendBefore({ ...newNode, data: "new2" }); //SIDE EFFECT
    jest.advanceTimersByTime(100);
    expect(treeEl.firstElementChild?.children[1].childElementCount)
        .toBe(4);
    expect((treeEl.firstElementChild?.children[1]
        .children[0].querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement)
        .innerText)
        .toBe("new2");

    tree.root.children[3].appendAfter({ ...newNode, data: "new3" }); //SIDE EFFECT
    jest.advanceTimersByTime(100);
    expect(treeEl.firstElementChild?.children[1].childElementCount)
        .toBe(5);
    expect((treeEl.firstElementChild?.children[1]
        .children[4].querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement)
        .innerText)
        .toBe("new3");

    tree.root.children[0].appendBefore({ ...newNode, data: "new4" }); //SIDE EFFECT
    jest.advanceTimersByTime(100);
    expect(treeEl.firstElementChild?.children[1].childElementCount)
        .toBe(6);
    expect((treeEl.firstElementChild?.children[1]
        .children[0].querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement)
        .innerText)
        .toBe("new4");
});

test("append node to leaf node", () => {
    const newNode: NodeProp<string> = {
        data: "new",
        children: undefined
    }
    const treeEl: HTMLElement = TreeX.createTree(tree, { document });
    document.body.appendChild(treeEl);

    (tree.find(node => node.data == "LEAF") as TreeNode<string>).appendChild(newNode); //SIDE EFFECT
    const span = Array.from(treeEl.querySelectorAll(`.${classNameMap.valueClass}`)).find(e => (e as HTMLSpanElement).innerText == "LEAF") as HTMLSpanElement;
    expect(span.parentElement?.parentElement?.children[1].childElementCount).toBe(1);
    expect((span.parentElement?.parentElement?.children[1].querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement).innerText)
        .toBe('new');
});
