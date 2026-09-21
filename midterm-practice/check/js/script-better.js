
const API_URL = "https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/products";

function getProducts() {

    return new Promise((resolve, reject) => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) throw new Error("Cannot get products.");
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function addProduct(newProduct) {
    return new Promise((resolve, reject) => {
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(newProduct),
        })

            .then(response => {
                if (!response.ok)  throw new Error("Cannot add this product.");
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function updateProduct(id, updatedProduct) {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(updatedProduct),
        })
            .then(response => {
                if (!response.ok) throw new Error("Cannot update this product.");
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function deleteProductAPI(id) {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) throw new Error("Cannot delete this product.");
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

}

const form = document.getElementById("product-form");
const gridContainer = document.getElementById("product-grid");
const tableBody = document.getElementById("product-table");
const cancelBtn = document.getElementById("cancel-btn");
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount);};

function renderUI() {
    getProducts()
        .then(products => {
            gridContainer.innerHTML = "";
            tableBody.innerHTML = "";
            products.forEach(product => {
                gridContainer.innerHTML += `
                    <div class="card">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="card-body">
                            <h3 class="card-title">${product.name}</h3>
                            <p style="font-size: 12px; color: #666; margin: 0 0 10px;">${product.description}</p>
                            <div class="card-price">${formatCurrency(product.price)}</div>
                            <div class="card-actions">
                                <button class="btn-edit" onclick="editProduct('${product.id}')">Update</button>
                                <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                            </div>
                        </div>
                    </div>
                `;

                tableBody.innerHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td><img src="${product.image}" alt="img"></td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.quantity}</td>
                        <td>${formatCurrency(product.price)}</td>
                        <td>
                            <button class="btn-edit" onclick="editProduct('${product.id}')">Update</button>
                            <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error("Error while fetching products:", error);
        });

}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
    
    const productData = {
        name: name,
        image: image,
        description: description,
        quantity: quantity,
        price: price};

    if (id) {
        updateProduct(id, productData)
            .then(data => {
                alert("Successfully updated!");
                console.log("Updated product:", data);
                closeModal();
                resetForm();
                renderUI();
            })
            .catch(error => {
                console.error("Error while updating:", error);
            });
        }
    else {
        addProduct(productData)
            .then(data => {
                alert("Successfully added!");
                console.log("Added product:", data);
                closeModal();
                resetForm();
                renderUI();
            })
            .catch(error => {
                console.error("Error while adding:", error);
            });
    }
});
function editProduct(id) {

    getProducts()
        .then(products => {
            const product = products.find(item => item.id === id);
            if (product) {
                document.getElementById("id").value = product.id;
                document.getElementById("name").value = product.name;
                document.getElementById("image").value = product.image;
                document.getElementById("description").value = product.description;
                document.getElementById("quantity").value = product.quantity;
                document.getElementById("price").value = product.price;

                document.getElementById("form-title").innerText = "Update Product";
                document.getElementById("submit-btn").innerText = "Update";
                cancelBtn.style.display = "inline-block";

                openModal();
            }
        })
        .catch(error => {
            console.error("Error while editing:", error);
        });
}
function deleteProduct(id) {
    const confirmDelete = confirm("Do you want to delete this product?");
    if (confirmDelete) {
        deleteProductAPI(id)
            .then(data => {
                alert("Successfully deleted.");
                console.log("Deleted product:", data);
                renderUI();
            })
            .catch(error => {
                console.error("Error while deleting:", error);
            });
    }
}

function resetForm() {
    form.reset();
    document.getElementById("id").value = "";
    document.getElementById("form-title").innerText = "Add New Product";
    document.getElementById("submit-btn").innerText = "Save Product";
    cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", function() {
    resetForm();
});

// Add these element selections near your other element declarations
const modalBackdrop = document.getElementById("modal-backdrop");
const openAddBtn = document.getElementById("open-add-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");

// Modal open/close helper functions
function openModal() {
    modalBackdrop.classList.add("active");
}

function closeModal() {
    modalBackdrop.classList.remove("active");
    resetForm();
}

// Open modal for adding a new product
openAddBtn.addEventListener("click", () => {
    resetForm();
    openModal();
});

// Close when clicking the 'X' icon or 'Cancel' button
modalCloseBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Close when clicking anywhere outside the modal box
window.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
        closeModal();
    }
});

// Close using the ESC key
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalBackdrop.classList.contains("active")) {
        closeModal();
    }
});

renderUI();