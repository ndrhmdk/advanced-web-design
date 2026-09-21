const API_URL = "https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/products";

const productList = document.getElementById('product-list');
const productTable = document.getElementById('product-table');
const productForm = document.getElementById('product-form');

const productIdInput = document.getElementById('product-id');
const nameInput = document.getElementById('name');
const imageInput = document.getElementById('image');
const descriptionInput = document.getElementById('description');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');

const submitButton = document.getElementById('submit-btn');
const cancelButton = document.getElementById('cancel-btn');

const formTitle = document.getElementById('form-title');

let products = []

/* Initial Load */
window.addEventListener("load", function() {
    loadProducts();
})

/* Loading Products */
function loadProducts() {
    Product.show()
        .then(data => {
            products = data;
            renderProducts();
            renderTable(); 
            addTableEventListeners();
            console.log("Successfully shown the data.");
        }).catch(error => {
            console.error(error);
            alert("Failed to load products.");
        });
}

/* Product Cards */
function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement("article");
        card.classList.add("product-card");

        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>

            <div class="product-content">
                <p class="product-id">Product #${product.id}</p>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-information">
                    <span>Stock: ${product.quantity}</span>
                    <strong>${formatPrice(product.price)}</strong>
                </div>
            </div>
        `;
        productList.appendChild(card);
    })
}

/* Display Table */
function renderTable() {
    productTable.innerHTML = "";
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td> ${product.id} </td>
            <td>
                <img src="${product.image}" alt="${product.name}" class="table-image">
            </td>
            <td> ${product.name} </td>
            <td> ${product.description} </td>
            <td> ${product.quantity} </td>
            <td> ${formatPrice(product.price)} </td>
            <td>
                <div class="table-actions">
                    <button class="action-button edit-button" data-id="${product.id}">Edit</button>
                    <button class="action-button delete-button" data-id="${product.id}">Delete</button>
                </div>
            </td>
        `;
        productTable.appendChild(row);
    })
}

// FormatPrice
function formatPrice(price) {
    return Number(price)
        .toLocaleString(
            "en-US",
            {
                style: "currency",
                currency: "USD"
            }
        );
}

/* Add/Update Form */
productForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const id = productIdInput.value;
    const product = new Product(
        id,
        imageInput.value.trim(),
        nameInput.value.trim(),
        descriptionInput.value.trim(),
        Number(quantityInput.value),
        Number(priceInput.value)
    );

    // Update
    if (id) {
        product.update()
            .then(data => {
                console.log("Updated:", data);
                alert("Product updated successfully!");
                resetForm();
                loadProducts();
            }).catch(error => {
                console.error(error);
                alert("Failed to udpate product.");
            });
    
    // Add
    } else {
        product.add()
            .then(data => {
                console.log("Added:", data);
                alert("Product added successfully!");
                resetForm();
                loadProducts();
            }).catch(error => {
                console.error(error);
                alert("Failed to update product.");
            })
    }
})

/* Table Button Events */
function addTableEventListeners() {
    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");
    
    // Edit
    editButtons.forEach(button => {
        button.addEventListener("click", function() {
            const id = this.dataset.id;
            editProduct(id);
        });
    });

    // Delete
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const id = this.dataset.id;
            deleteProduct(id);
        });
    });
}

/* Edit Product */
function editProduct(id) {
    const product = products.find(item => item.id == id);
    if (!product) return;

    productIdInput.value = product.id;
    nameInput.value = product.name;
    imageInput.value = product.image;
    descriptionInput.value = product.description;
    quantityInput.value = product.quantity;
    priceInput.value = product.price;

    formTitle.textContent = "Update Product";
    submitButton.textContent = "Update Product";
    
    // scroll to form
    document.getElementById("management")
            .scrollIntoView({behavior: "smooth"});
}

/* Delete Product */
function deleteProduct(id) {
    const product = products.find(item => item.id == id);
    if (!product) return;

    const confirmed = confirm(`Delete "${product.name}"?`);
    if (!confirmed) return;

    const productObject = new Product(
        product.id,
        product.image,
        product.name,
        product.description,
        product.quantity,
        product.price);
    productObject.delete()
        .then(data => {
            console.log("Deleted:", data);
            alert("Product deleted successfully.");
            loadProducts();
        }).catch(error => {
            console.error(error);
            alert("Failed to delete product.");
        })
}

/* Cancel */
cancelButton.addEventListener("click", function() {
    resetForm();
})

/* Reset Form */
function resetForm() {
    productForm.reset();
    productIdInput.value = "";
    formTitle.textContent = "Add Product";
    submitButton.textContent = "Add Product";
}
