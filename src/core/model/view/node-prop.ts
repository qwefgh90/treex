export interface NodeProp<T>{
    data: T,
    children?: NodeProp<T>[]
}