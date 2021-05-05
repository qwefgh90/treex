/**
 * A simple interface which contains information to make a node
 * @public
 */
export interface NodeProp<T> {
    /**
     * Data to have
     */
    data: T;
    /**
     * A child list
     */
    children?: NodeProp<T>[];
}
//# sourceMappingURL=node-prop.d.ts.map