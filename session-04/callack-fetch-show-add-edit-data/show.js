function getStaff(callback) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function handleStaff(error, data) {
    if (error) {
        console.error('Error while fetching staff data:', error);
        return;
    } else {
        const staffTableBody = document.getElementById('staffTableBody');
        staffTableBody.innerHTML = '';   // clear table before rendering
        data.forEach((staff, index) => {
            const formattedBirthday = staff.birthday 
                ? new Date(staff.birthday).toLocaleDateString() 
                : 'N/A';
            
            const row = document.createElement('tr');
            row.id = `staff-row-${staff.id}`;
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${staff.id}</td>
                <td>
                    <img src="${staff.avatar}" alt="${staff.name}" width="45" height="45" class="rounded-circle">
                </td>
                <td>${staff.name}</td>
                <td>${staff.gender}</td>
                <td>${formattedBirthday}</td>
                <td>
                    <a href="edit.html?id=${staff.id}" class="btn btn-sm btn-primary">Edit</a>
                    <button class="btn btn-sm btn-danger ms-1" onclick="deleteStaff('${staff.id}')">Delete</button>
                </td>`;
            staffTableBody.appendChild(row);
        });
    }
}

function deleteStaff(id) {
    const confirmDelete = confirm("Are you sure you want to delete this staff?");
    if (!confirmDelete) return;

    fetch(`${API_URL}/${id}`, 
        {method: "DELETE"})
            .then(response => {
                if (!response.ok) throw new Error("Cannot delete this staff.");
                return response.json();
            })
            .then(() => {
                alert("Successfully deleted");
                const rowToRemove = document.getElementById(`staff-row-${id}`);
                if (rowToRemove) rowToRemove.remove();
            })
            .catch(error => {
                console.error('Error while deleting:', error);
                alert("Error while deleting this staff.");
            })
}

getStaff(handleStaff);