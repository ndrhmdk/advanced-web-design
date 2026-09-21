class Product {
    constructor(id, image, name, description, quantity, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    static show() {
        return new Promise((resolve, reject) => {
            fetch(API_URL)
                .then(response => {
                    if (!response.ok) throw new Error("Cannot fetch products.");
                    return response.json();
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        })
    }

    add() {
        const newProduct = {
            image: this.image,
            name: this.name,
            description: this.description,
            quantity: this.quantity,
            price: this.price};
        return new Promise((resolve, reject) => {
            fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                body: JSON.stringify(newProduct)
            }).then(response => {
                if (!response.ok) throw new Error("Cannot add product.");
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    update() {
        const updatedProduct = {
            image: this.image,
            name: this.name,
            description: this.description,
            quantity: this.quantity,
            price: this.price};
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${this.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                body: JSON.stringify(updatedProduct)
            }).then(response => {
                if (!response.ok) throw new Error("Cannot update product.");
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }
    
    delete() {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${this.id}`, {
                method: "DELETE"
            }).then(response => {
                if (!response.ok) throw new Error("Cannot delete product.");
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        })
    }
}