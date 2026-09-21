const API_URL = "https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/products";
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount);};

function getProducts() {
    return fetch(API_URL).then(res => {
        if (!res.ok) throw new Error("Cannot get products.");
        return res.json();
    });
}

function addProduct(newProduct) {
    return fetch(API_URL, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(newProduct),
    }).then(res => res.json());
}

function updateProduct(id, updatedProduct) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(updatedProduct),
    }).then(res => res.json());
}

function deleteProductAPI(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(res => res.json());
}