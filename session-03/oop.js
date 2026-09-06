class Product {
    id = 0;
    name = '';
    price = 0;

    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    displayInfo() {
        console.log(`ProductID: ${this.id}, name: ${this.name}, price: $${this.price}.`);
    }
}

const product01 = new Product(1, "Laptop", 1000);
const product02 = new Product(2, "iPhone", 1999);

product01.displayInfo();
product02.displayInfo();