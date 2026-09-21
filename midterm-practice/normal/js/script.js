const form = document.getElementById("product-form");
const tableBody = document.getElementById("product-table");
const cancelBtn = document.getElementById("cancel-btn");

function renderTable() {
    getProducts().then(products => {
        tableBody.innerHTML = "";
        products.forEach(product => {
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
    }).catch(console.error);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const productData = {
        name: document.getElementById("name").value,
        image: document.getElementById("image").value,
        description: document.getElementById("description").value,
        quantity: parseInt(document.getElementById("quantity").value),
        price: parseFloat(document.getElementById("price").value)
    };
    
    const id = document.getElementById("id").value;

    if (id) {
        updateProduct(id, productData).then(() => {
            alert("Successfully updated!");
            resetForm();
            renderTable();
        }).catch(console.error);
    } else {
        addProduct(productData).then(() => {
            alert("Successfully added!");
            resetForm();
            renderTable();
        }).catch(console.error);
    }
});

function editProduct(id) {
    getProducts().then(products => {
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
            document.querySelector(".form-container").scrollIntoView({ behavior: "smooth" });
        }
    }).catch(console.error);
}

function deleteProduct(id) {
    if (confirm("Do you want to delete this product?")) {
        deleteProductAPI(id).then(() => {
            alert("Successfully deleted.");
            renderTable();
        }).catch(console.error);
    }
}

function resetForm() {
    form.reset();
    document.getElementById("id").value = "";
    document.getElementById("form-title").innerText = "Add New Product";
    document.getElementById("submit-btn").innerText = "Save Product";
    cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);
renderTable();