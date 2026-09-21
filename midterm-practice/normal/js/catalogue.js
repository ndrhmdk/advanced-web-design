const gridContainer = document.getElementById("product-grid");

function renderGrid() {
    getProducts().then(products => {
        gridContainer.innerHTML = "";
        products.forEach(product => {
            gridContainer.innerHTML += `
                <div class="card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="card-body">
                        <h3 class="card-title">${product.name}</h3>
                        <p style="font-size: 12px; color: #666; margin: 0 0 10px;">${product.description}</p>
                        <div class="card-price">${formatCurrency(product.price)}</div>
                        <div class="card-actions">
                            <button class="btn-edit" onclick="redirectToEdit()">Edit in List</button>
                            <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }).catch(console.error);
}

function deleteProduct(id) {
    if (confirm("Do you want to delete this product?")) {
        deleteProductAPI(id).then(() => {
            alert("Successfully deleted.");
            renderGrid();
        }).catch(console.error);
    }
}

function redirectToEdit() {
    window.location.href = "index-list.html";
}

renderGrid();