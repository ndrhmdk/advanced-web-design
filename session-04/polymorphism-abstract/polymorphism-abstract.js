/* Abstract Class */
class Shape {
    constructor(name) {
        if (this.constructor === Shape) 
            throw new Error("Shap is an abstract class and cannot be instantiated.");
        this.name = name;
    }

    draw() {
        throw new Error("draw() must be implemented by the child class.");
    }

    describe() {
        console.log(`This is a ${this.name}.`);
    }
}

/* Child Class */
// Circle
class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;

    }

    draw() {
        console.log(`Drawing a circle with radius ${this.radius}.`);
    }
}

// Rectangle
class Rectangle extends Shape {
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    draw() {
        console.log(`Drawing a rectangle ${this.width} x ${this.height}`);
    }
}

// Triangle
class Triangle extends Shape {
    constructor(base, height) {
        super("Triangle");
        this.base = base;
        this.height = height;
    }

    draw() {
        console.log(`Drawing a triangle with base ${this.base} and height ${this.height}`);
    }
}


/* Polymorphism */
const shapes = [
    new Circle(5),
    new Rectangle(10, 20),
    new Triangle(8, 12)
];

for (const shape of shapes) {
    shape.describe();
    shape.draw();
}