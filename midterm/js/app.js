const API_URL = "https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/tour"

const tourList = document.getElementById("tour-list");
const tourTable = document.getElementById("tour-table");
const tourForm = document.getElementById("tour-form");

const tourIdInput = document.getElementById("tour-id");
const tenTourInput = document.getElementById("tenTour");
const imageInput = document.getElementById("image");
const moTaInput = document.getElementById("moTa");
const ngayKhoiHanhInput = document.getElementById("ngayKhoiHanh");
const ngayKetThucInput = document.getElementById("ngayKetThuc");
const giaTourInput = document.getElementById("giaTour");

const submitButton = document.getElementById("submit-btn");
const cancelButton = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");

let tours = [];

window.addEventListener("load", function() {
    loadTours()
})

function loadTours() {
    TourDuLich.show()
        .then(data => {
            tours = data;
            renderTours();
            renderTable();
            addTableEventListeners();
            console.log("Tours successfully loaded.");
        }).catch(error => {
            console.error(error);
            alert("Cannot fetch tour list.");
        });
}

function renderTours() {
    tourList.innerHTML = "";
    tours.forEach(tour => {
        const card = document.createElement("article");
        card.classList.add("tour-card");
        card.innerHTML = `
            <div class="tour-image-wrapper">
                <img src="${tour.image}" alt="${tour.tenTour}" class="tour-image">
            </div>
            <div class="tour-content">
                <p class="tour-id">Tour ID ${tour.id}</p>
                <h3>${tour.tenTour}</h3>
                <p class="tour-description">${tour.moTa}</p>
                <div class="tour-dates">
                    <span>Start Date: ${formatDate(tour.ngayKhoiHanh)}</span>
                    <span>End Date: ${formatDate(tour.ngayKetThuc)}</span>
                </div>
                <strong class="tour-price">${formatPrice(tour.giaTour)}</strong>
            </div>

            <button class="book-button" data-id="${tour.id}">Book Tour</button>
        `;
        tourList.appendChild(card);
    })
}

function renderTable() {
    tourTable.innerHTML = "";
    tours.forEach(tour => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tour.id}</td>
            <td>
                <img src="${tour.image}" alt="${tour.tenTour}" class="table-image">
            </td>
            <td>${tour.tenTour}</td>
            <td>${tour.moTa}</td>
            <td>${formatDate(tour.ngayKhoiHanh)}</td>
            <td>${formatDate(tour.ngayKetThuc)}</td>
            <td>${formatPrice(tour.giaTour)}</td>
            <td>
                <div class="table-actions">
                    <button class="action-button edit-button" data-id="${tour.id}">Edit</button>
                    <button class="action-button delete-button" data-id="${tour.id}">Delete</button>
                </div>
            </td>
        `;
        tourTable.appendChild(row);
    });
}

/** Formatting */
function formatPrice(price) {
    return Number(price).toLocaleString(
        "en-US", {style: "currency", currency: "USD"}
    );
}

function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US");
}

function formatDateInput(value) {
    if (!value) return "";
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const year = String(date.getFullYear()).padStart(4, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

tourForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const id = tourIdInput.value;

    if (new Date(ngayKetThucInput.value) < new Date(ngayKhoiHanhInput.value)) {
        alert("The end date has to be after the start date.");
        return;
    }

    const tour = new TourDuLich(
        id, 
        imageInput.value.trim(),
        tenTourInput.value.trim(),
        moTaInput.value.trim(),
        ngayKhoiHanhInput.value,
        ngayKetThucInput.value,
        Number(giaTourInput.value));

    if (id) {
        // update
        tour.capNhatTour()
            .then(data => {
                console.log("Updated:", data);
                alert("Successfully updated tour.");
                resetForm();
                loadTours();
            }).catch(error => {
                console.error(error);
                alert("Updated failed.");
            });
    } else {
        // Add
        tour.taoTour()
            .then(data => {
                console.log("Added:", data);
                alert("Successfully added tour.");
                resetForm();
                loadTours();
            }).catch(error => {
                console.error(error);
                alert("Added failed.");
            });
    }
});

function addTableEventListeners() {
    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
                const id = this.dataset.id;
                editTour(id);
            }
        );
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
                const id = this.dataset.id;
                deleteTour(id);
            }
        );
    });
}

function editTour(id) {
    const tour = tours.find(item => item.id == id);
    if (!tour) return;

    tourIdInput.value = tour.id;
    tenTourInput.value = tour.tenTour;
    imageInput.value = tour.image;
    moTaInput.value = tour.moTa;
    ngayKhoiHanhInput.value = formatDateInput(tour.ngayKhoiHanh);
    ngayKetThucInput.value = formatDateInput(tour.ngayKetThuc);
    giaTourInput.value = tour.giaTour;

    formTitle.textContent = "Update Tour";
    submitButton.textContent = "Update Tour";

    document
        .getElementById("management")
        .scrollIntoView({behavior: "smooth"});
}

function deleteTour(id) {
    const tour = tours.find(item => item.id == id);
    if (!tour) return;

    const confirmed = confirm(`Do you want to delete "${tour.tenTour}"?`);
    if (!confirmed) return;

    const tourObject =
        new TourDuLich(
            tour.id,
            tour.image,
            tour.tenTour,
            tour.moTa,
            tour.ngayKhoiHanh,
            tour.ngayKetThuc,
            tour.giaTour);


    tourObject.xoaTour()
        .then(data => {
            console.log("Deleted:", data);
            alert("Successfully deleted");
            loadTours();
        }).catch(error => {
            console.error(error);
            alert("Deleted failed.");
        });
}

cancelButton.addEventListener("click", function () {
        resetForm();
    }
);

function resetForm() {
    tourForm.reset();
    tourIdInput.value = "";
    formTitle.textContent = "Add Tour";
    submitButton.textContent = "Add Tour";
}
