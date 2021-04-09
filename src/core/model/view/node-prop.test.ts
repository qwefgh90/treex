import { NodeProp } from "./node-prop";

interface Person{
    lastname: string;
    firstname: string;
    age: number;
}
const p: Person = {
    lastname: "Kim",
    firstname: "Trickfinger",
    age: 40
}
test("use generic NodeProp interface", () => {
    const node2: NodeProp<Person> = {
        data: {lastname: "Michael", firstname: "Anthony", age: 44},
        children: undefined
    }
    const node1: NodeProp<Person> = {
        data: p,
        children: [node2]
    }
});