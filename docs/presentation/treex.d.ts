import { TreeNode } from "../core/model/tree/node";
import { Tree } from "../core/model/tree/tree";
/**
 * @public
 */
export interface TreeOption<T> {
    document: Document;
    templateFactory?: TemplateFactory<T>;
    hiddenRoot?: boolean;
}
/**
 * @public
 */
export declare const classNameMap: Readonly<{
    outerClass: string;
    nodeBoxClass: string;
    childrenClass: string;
    valueClass: string;
    selectedClass: string;
    expandIconClass: string;
    collapseIconClass: string;
    hiddenClass: string;
    noneClass: string;
}>;
/**
 * @public
 */
export declare type ToStringInterface = Pick<string, "toString">;
/**
 * @public
 */
export declare class TreeX {
    static createTree<T extends ToStringInterface>(tree: Tree<T>, option?: TreeOption<T>): HTMLElement;
    static templateFactory<T>(fragment: DocumentFragment, connector: (fragment: DocumentFragment, node: TreeNode<T>) => void): TemplateFactory<T>;
    static templateFactory<T extends ToStringInterface>(fragment: DocumentFragment): TemplateFactory<T>;
    private static createElementSet;
    private static createTreeNode;
}
/**
 * @public
 */
export declare class TemplateFactory<T> {
    private readonly userFragment;
    private readonly userConnector;
    static getDefaultFactory<U extends ToStringInterface>(document: Document): TemplateFactory<U>;
    static readonly defaultConnector: <U extends ToStringInterface>(fragment: DocumentFragment, node: TreeNode<U>) => void;
    readonly fragment: DocumentFragment;
    readonly connector: (fragment: DocumentFragment, node: TreeNode<T>) => void;
    private constructor();
    static create<U extends ToStringInterface>(fragment: DocumentFragment, connector: (htmlElement: DocumentFragment, node: TreeNode<U>) => void): TemplateFactory<U>;
    private checkValidation;
    private extendedConnector;
    private extendedFragment;
}
//# sourceMappingURL=treex.d.ts.map