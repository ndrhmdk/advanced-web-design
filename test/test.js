/* =========================
   GLOBAL VARIABLES
========================= */
// Current mode:
// "add" = adding a new staff
// "edit" = editing an existing staff
let currentMode = "add";
// ID of the staff currently being edited
let currentStaffId = null;
// ID of the staff waiting to be deleted
let staffToDeleteId = null;
/* =========================
   DOM ELEMENTS
========================= */
const staffTableBody = document.getElementById("staffTableBody");
const staffModal = document.getElementById("staffModal");
const deleteModal = document.getElementById("deleteModal");
const staffForm = document.getElementById("staffForm");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const btnSubmit = document.getElementById("btn-submit");
const btnAdd = document.getElementById("btn-add");
const btnClose = document.getElementById("btn-close");
const btnCancel = document.getElementById("btn-cancel");
const btnDeleteCancel = document.getElementById("btn-delete-cancel");
const btnDeleteConfirm = document.getElementById("btn-delete-confirm");
/* =========================
   GET STAFF
========================= */
function getStaff() {
    fetch(API_URL).then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch staff data.");
        }
        return response.json();
    }).then(data => {
        renderStaff(data);
    }).catch(error => {
        console.error("Error while fetching staff data:", error);
        staffTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="error-message">
                        Failed to load staff data.
                    </td>
                </tr>
            `;
    });
}
/* =========================
   RENDER STAFF TABLE
========================= */
function renderStaff(data) {
    // Clear existing rows
    staffTableBody.innerHTML = "";
    // No staff
    if (data.length === 0) {
        staffTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-message">
                    No staff found.
                </td>
            </tr>
        `;
        return;
    }
    data.forEach((staff, index) => {
        const formattedBirthday = formatDisplayDate(staff.birthday);
        const row = document.createElement("tr");
        // Use the real API ID for the row ID
        row.id = `staff-row-${staff.id}`;
        row.innerHTML = `
            <td class="staff-number">
                ${index + 1}
            </td>

            <td>
                <img
                    src="${staff.avatar}"
                    alt="${staff.name}"
                    class="staff-avatar"
                >
            </td>

            <td>
                <span class="staff-name">
                    ${staff.name}
                </span>
            </td>

            <td>
                <span class="gender-badge">
                    ${staff.gender}
                </span>
            </td>

            <td>
                ${formattedBirthday}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        type="button"
                        class="btn-edit"
                        onclick="openEditModal('${staff.id}')"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="btn-delete"
                        onclick="openDeleteModal('${staff.id}', '${escapeAttribute(staff.name)}')"
                    >
                        Delete
                    </button>

                </div>

            </td>
        `;
        staffTableBody.appendChild(row);
    });
}
/* =========================
   FORMAT DISPLAY DATE
========================= */
function formatDisplayDate(dateString) {
    if (!dateString) {
        return "N/A";
    }
    return new Date(dateString).toLocaleDateString();
}
/* =========================
   FORMAT DATE FOR INPUT
========================= */
function formatDateForInput(dateString) {
    if (!dateString) {
        return "";
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
/* =========================
   OPEN ADD MODAL
========================= */
function openAddModal() {
    currentMode = "add";
    currentStaffId = null;
    // Change modal text
    modalTitle.textContent = "Add New Staff";
    modalDescription.textContent = "Enter the staff information below.";
    btnSubmit.textContent = "Add Staff";
    // Clear form
    staffForm.reset();
    // Show modal
    openModal(staffModal);
}
/* =========================
   OPEN EDIT MODAL
========================= */
function openEditModal(id) {
    currentMode = "edit";
    currentStaffId = id;
    // Change modal text
    modalTitle.textContent = "Edit Staff";
    modalDescription.textContent = "Update the staff information below.";
    btnSubmit.textContent = "Update Staff";
    // Get staff information
    fetch(`${API_URL}/${id}`).then(response => {
        if (!response.ok) {
            throw new Error("Cannot fetch staff information.");
        }
        return response.json();
    }).then(data => {
        // Fill the form
        document.getElementById("name").value = data.name || "";
        document.getElementById("gender").value = data.gender || "";
        document.getElementById("avatar").value = data.avatar || "";
        document.getElementById("birthday").value = formatDateForInput(data.birthday);
        // Show modal
        openModal(staffModal);
    }).catch(error => {
        console.error("Error while fetching staff:", error);
        alert("Unable to load staff information.");
    });
}
/* =========================
   OPEN MODAL
========================= */
function openModal(modal) {
    modal.classList.add("show");
    document.body.classList.add("modal-open");
}
/* =========================
   CLOSE MODAL
========================= */
function closeModal(modal) {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
}
/* =========================
   ADD / EDIT FORM SUBMIT
========================= */
staffForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const selectedDate = document.getElementById("birthday").value;
    const isoBirthday = selectedDate ? new Date(`${selectedDate}T00:00:00`).toISOString() : new Date().toISOString();
    const staffData = {
        name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        birthday: isoBirthday,
        avatar: document.getElementById("avatar").value
    };
    /* =========================
       ADD
    ========================== */
    if (currentMode === "add") {
        addStaff(staffData);
    }
    /* =========================
       EDIT
    ========================== */
    else if (currentMode === "edit") {
        updateStaff(currentStaffId, staffData);
    }
});
/* =========================
   ADD STAFF
========================= */
function addStaff(staffData) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Adding...";
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(staffData)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to add staff.");
        }
        return response.json();
    }).then(() => {
        alert("Staff successfully added!");
        closeModal(staffModal);
        staffForm.reset();
        getStaff();
    }).catch(error => {
        console.error("Error while adding staff:", error);
        alert("Error occurred while adding staff.");
    }).finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Add Staff";
    });
}
/* =========================
   UPDATE STAFF
========================= */
function updateStaff(id, staffData) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Updating...";
    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(staffData)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to update staff.");
        }
        return response.json();
    }).then(() => {
        alert("Staff successfully updated!");
        closeModal(staffModal);
        getStaff();
    }).catch(error => {
        console.error("Error while updating:", error);
        alert("Error occurred while updating staff.");
    }).finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Update Staff";
    });
}
/* =========================
   OPEN DELETE MODAL
========================= */
function openDeleteModal(id, name) {
    staffToDeleteId = id;
    document.getElementById("deleteStaffName").textContent = name;
    openModal(deleteModal);
}
/* =========================
   DELETE STAFF
========================= */
function deleteStaff(id) {
    btnDeleteConfirm.disabled = true;
    btnDeleteConfirm.textContent = "Deleting...";
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete staff.");
        }
        /*
         * DELETE APIs sometimes return
         * an empty response (204).
         *
         * Therefore we don't call
         * response.json() here.
         */
        return;
    }).then(() => {
        alert("Staff successfully deleted!");
        closeModal(deleteModal);
        getStaff();
    }).catch(error => {
        console.error("Error while deleting:", error);
        alert("Error occurred while deleting staff.");
    }).finally(() => {
        btnDeleteConfirm.disabled = false;
        btnDeleteConfirm.textContent = "Delete";
    });
}
/* =========================
   ESCAPE ATTRIBUTE
========================= */
function escapeAttribute(value) {
    return value.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}
/* =========================
   BUTTON EVENTS
========================= */
// Add button
btnAdd.addEventListener("click", openAddModal);
// Close X button
btnClose.addEventListener("click",
    () => closeModal(staffModal));
// Cancel Add/Edit
btnCancel.addEventListener("click",
    () => closeModal(staffModal));
// Cancel Delete
btnDeleteCancel.addEventListener("click",
    () => closeModal(deleteModal));
// Confirm Delete
btnDeleteConfirm.addEventListener("click",
    () => {
        if (staffToDeleteId !== null) {
            deleteStaff(staffToDeleteId);
        }
    });
/* =========================
   CLOSE WHEN CLICKING
   OUTSIDE MODAL
========================= */
staffModal.addEventListener("click", function(e) {
    if (e.target === staffModal) {
        closeModal(staffModal);
    }
});
deleteModal.addEventListener("click", function(e) {
    if (e.target === deleteModal) {
        closeModal(deleteModal);
    }
});
/* =========================
   ESC KEY
========================= */
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal(staffModal);
        closeModal(deleteModal);
    }
});
/* =========================
   INITIAL LOAD
========================= */
getStaff();