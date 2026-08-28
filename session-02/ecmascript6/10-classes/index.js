class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

const person = new Person("Bob");
console.log(person.greet());    // Hello, my name is Bob