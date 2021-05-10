import { TreeNode } from "../core/model/tree/node";
import { Tree } from "../core/model/tree/tree";
/**
 * @public
 */
export interface TreeOption<T> {
    document: Document,
    templateFactory?: TemplateFactory<T>,
    hiddenRoot?: boolean,
}
const defualtOption = {
    document, hiddenRoot: false
}
const prefix = `treex-default-`;

/**
 * @public
 */
export const classNameMap = Object.freeze({
    outerClass: `${prefix}outer`,
    nodeBoxClass: `${prefix}box`,
    childrenClass: `${prefix}children`,
    valueClass: `${prefix}value`,
    selectedClass: `${prefix}selected`,
    expandIconClass: `${prefix}expand`,
    collapseIconClass: `${prefix}collapse`,
    hiddenClass: `${prefix}is-hidden`,
    noneClass: `${prefix}is-none`,
});
/**
 * @public
 */
export type ToStringInterface = Pick<string, "toString">;
/**
 * @public
 */
export class TreeX {
    public static createTree<T extends ToStringInterface>(tree: Tree<T>, option: TreeOption<T> = defualtOption): HTMLElement {
        if (tree.root.data?.toString == undefined) {
            throw new Error("Node's data field must have toString() method.");
        }
        let document = option.document;
        let template: TemplateFactory<T> = option.templateFactory ?? TemplateFactory.getDefaultFactory(document);
        let hiddenRoot = option.hiddenRoot;
        let treeEl = document.createElement('div');
        const map = new Map<TreeNode<T>, {
            boxElement: HTMLDivElement,
            nodeElement: HTMLDivElement,
            childrenElement: HTMLDivElement
        }>();
        tree.root.getNodes("dfs").forEach(node => {
            if (node.parent != "tree" && node.parent)
                this.createTreeNode(node, template, map, node.parent, undefined, hiddenRoot);
            else
                this.createTreeNode(node, template, map, treeEl, undefined, hiddenRoot);
        });
        return treeEl;
    }
    public static templateFactory<T>(fragment: DocumentFragment, connector: (fragment: DocumentFragment, node: TreeNode<T>) => void): TemplateFactory<T>;
    public static templateFactory<T extends ToStringInterface>(fragment: DocumentFragment): TemplateFactory<T>;
    public static templateFactory<T extends ToStringInterface>(fragment: DocumentFragment, connector?: (fragment: DocumentFragment, node: TreeNode<T>) => void) {
        if (fragment == undefined) {
            throw new Error("fragment must be passed to TreeX.templateFactory()");
        }
        return TemplateFactory.create(fragment, connector ?? TemplateFactory.getDefaultFactory<T>(fragment.ownerDocument).connector);
    }
    private static createElementSet<T>(node: TreeNode<T>, nodeTemplate: TemplateFactory<T>) {
        let outerElement = document.createElement('div');
        let nodeElement = document.createElement('div');
        let childrenElement = document.createElement('div');
        outerElement.classList.add(classNameMap.outerClass);
        nodeElement.classList.add(classNameMap.nodeBoxClass);
        childrenElement.classList.add(classNameMap.childrenClass);
        const cloneFragment = nodeTemplate.fragment.cloneNode(true) as DocumentFragment;
        nodeTemplate.connector(cloneFragment, node);
        nodeElement.appendChild(cloneFragment);
        outerElement.append(nodeElement, childrenElement);
        return { boxElement: outerElement, nodeElement, childrenElement };
    }
    //TODO: add extensibility to accept user-defined template
    private static createTreeNode<T>(node: TreeNode<T>, template: TemplateFactory<T>,
        map: Map<TreeNode<T>, {
            boxElement: HTMLDivElement;
            nodeElement: HTMLDivElement;
            childrenElement: HTMLDivElement;
        }>, parent: HTMLDivElement | TreeNode<T>, positionIndex: number | undefined = undefined, hiddenRoot: boolean = false) {
        let { boxElement, nodeElement, childrenElement } = this.createElementSet(node, template);
        // let collapseElement = nodeElement.querySelector(`.${classNameMap.collapseIconClass}`);
        // let expandElement = nodeElement.querySelector(`.${classNameMap.expandIconClass}`);
        map.set(node, { boxElement, nodeElement, childrenElement });
        if (parent instanceof TreeNode) {
            const parentElementGroup = map.get(parent);
            if (parentElementGroup) {
                if (typeof positionIndex === 'number') {
                    const nextEl = parentElementGroup.childrenElement.children.item(positionIndex);
                    parentElementGroup.childrenElement.insertBefore(boxElement, nextEl);
                } else
                    parentElementGroup.childrenElement.append(boxElement);
            }
        } else {
            if(hiddenRoot)
                nodeElement.classList.add(classNameMap.noneClass);
            parent.append(boxElement);
        }
        node.onRemoved().then((removedNode) => { //TODO: rxjs doesn't work with fakeTimer
            boxElement.remove();
            map.delete(node);
        })
        let s1 = node.onChildChanged().subscribe((e) => {
            if ('ADDED' in e) 
                this.createTreeNode(e.addedNode, template, map, e.node, e.index);
        });
        let s2 = node.onVisibilityChange().subscribe((e) => {
            if (e.visible) {
                boxElement.classList.remove(classNameMap.noneClass);
                if (node.parent instanceof TreeNode) // TODO: performance issue
                    node.parent.setVisibility(true);
            } else {
                boxElement.classList.add(classNameMap.noneClass);
            }
        });
        let s3 = node.onSelectionChange().subscribe((e) => {
            if (e.selected)
                boxElement.classList.add(classNameMap.selectedClass);
            else
                boxElement.classList.remove(classNameMap.selectedClass);
        });
        node.onRemoved().then(() => {
            s1.unsubscribe();
            s2.unsubscribe();
            s3.unsubscribe();
        });
    }
}


/**
 * @public
 */
export class TemplateFactory<T>{
    static getDefaultFactory<U extends ToStringInterface>(document: Document): TemplateFactory<U> {
        const defaultFragment = document.createDocumentFragment();
        const outer = document.createElement('div');
        outer.innerHTML = `
                <input type="checkbox"/>
                <span class="${classNameMap.valueClass}">
                </span>`;
        defaultFragment.append(...Array.from(outer.childNodes));
        return new TemplateFactory(defaultFragment, TemplateFactory.defaultConnector);
    }
    static readonly defaultConnector = <U extends ToStringInterface>(fragment: DocumentFragment, node: TreeNode<U>) => {
        const valueEl = fragment.querySelector(`.${classNameMap.valueClass}`) as HTMLSpanElement;
        valueEl.innerText = node.data?.toString?.() ?? "";
    }

    readonly fragment: DocumentFragment;
    readonly connector: (fragment: DocumentFragment, node: TreeNode<T>) => void;
    private constructor(private readonly userFragment: DocumentFragment, private readonly userConnector: (fragment: DocumentFragment, node: TreeNode<T>) => void) {
        this.checkValidation();
        this.fragment = this.extendedFragment(userFragment);
        this.connector = this.extendedConnector(userConnector);
    }
    public static create<U extends ToStringInterface>(fragment: DocumentFragment, connector: (htmlElement: DocumentFragment, node: TreeNode<U>) => void): TemplateFactory<U>;
    public static create<U extends ToStringInterface>(fragment: DocumentFragment, connector?: (htmlElement: DocumentFragment, node: TreeNode<U>) => void): TemplateFactory<U> {
        return new TemplateFactory(fragment, connector ?? TemplateFactory.defaultConnector);
    }
    private checkValidation(){
        if(!this.userFragment || !this.userConnector)
            throw new Error("a fragment or a connector must not undefined.");
    }
    private extendedConnector(connector: (fragment: DocumentFragment, node: TreeNode<T>) => void){
        return (fragment: DocumentFragment, node: TreeNode<T>) => {
            let _collapseElement = fragment.querySelector(`.${classNameMap.collapseIconClass}`);
            let _expandElement = fragment.querySelector(`.${classNameMap.expandIconClass}`);
            if (_collapseElement && _expandElement
                && _collapseElement.nodeType == Node.ELEMENT_NODE
                && _expandElement.nodeType == Node.ELEMENT_NODE) {
                const collapseElement = _collapseElement as HTMLElement;
                const expandElement = _expandElement as HTMLElement;
                let s = node.onChildChanged().subscribe((e) => {
                    if (node.children.length == 0) {
                        collapseElement.classList.add(classNameMap.hiddenClass);
                        expandElement.classList.add(classNameMap.hiddenClass);
                    } else {
                        collapseElement.classList.remove(classNameMap.hiddenClass);
                        expandElement.classList.remove(classNameMap.hiddenClass);
                    }
                });
                /**
                 * Assume visibility update propagate bottom up
                 */
                let s1 = node.onVisibilityChange().subscribe((e) => {
                    if (node.children.find(n => n.visibility)) {
                        expandElement?.classList.add(classNameMap.noneClass);
                        collapseElement?.classList.remove(classNameMap.noneClass);
                    }
                });
                // if (collapseElement?.tagName == 'span'.toUpperCase() && expandElement?.tagName == 'span'.toUpperCase()) {
                collapseElement.onclick = (e) => {
                    node.children.forEach(n => n.setVisibility(false));
                    collapseElement?.classList.add(classNameMap.noneClass);
                    expandElement?.classList.remove(classNameMap.noneClass);
                };
                expandElement.onclick = (e) => {
                    node.children.forEach(n => n.setVisibility(true));
                    expandElement?.classList.add(classNameMap.noneClass);
                    collapseElement?.classList.remove(classNameMap.noneClass);
                };
                expandElement.classList.add(classNameMap.noneClass);
                if (node.children.length == 0) {
                    collapseElement.classList.add(classNameMap.hiddenClass);
                    expandElement.classList.add(classNameMap.hiddenClass);
                } else {
                    collapseElement.classList.remove(classNameMap.hiddenClass);
                    expandElement.classList.remove(classNameMap.hiddenClass);
                }
                node.onRemoved().then(() => {
                    s.unsubscribe();
                    s1.unsubscribe();
                });
            }
            connector(fragment, node);
        };
    }
    private extendedFragment(fragment: DocumentFragment){
        let icons = document.createElement('div');
        let collapseElement = fragment.querySelector(`.${classNameMap.collapseIconClass}`);
        let expandElement = fragment.querySelector(`.${classNameMap.expandIconClass}`);
        const newFragment = fragment.ownerDocument.createDocumentFragment();
        if(!collapseElement && !expandElement){
            icons.innerHTML =
            `<span class="${classNameMap.expandIconClass}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </span>
            <span class="${classNameMap.collapseIconClass}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
            </span>`;
            newFragment.append(...Array.from(icons.childNodes));
        }
        newFragment.append(...Array.from(fragment.childNodes));
        return newFragment;
    }
    // private checkValidation() {
    //     let temporaryChildren: Node[] = [];
    //     try {
    //         let clone = this.fragment.cloneNode(true) as DocumentFragment;
    //         this.combineTreeNodeWithElement(clone, this.treeForTest.root); //script input is not compatible with treeForTest
    //         temporaryChildren = Array.from(clone.childNodes);
    //         document.body.appendChild(clone);
    //     } finally {
    //         temporaryChildren.forEach(node => node.parentNode?.removeChild(node));
    //     }
    // }
}