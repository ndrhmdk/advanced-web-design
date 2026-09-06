const API_URL = "https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/staffs";
function getStaff(callback) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function handleStaff(error, data) {
    if (error) {
        console.error("Error while fetching staff data:", error);
    } else {
        const staffTableBody = document.getElementById('staffTableBody');
        data.forEach(staff => {
            const formattedBirthday = staff.birthday ? new Date(staff.birthday).toLocaleDateString() : "N/A";
            const row = `<tr>
                <td>${staff.id}</td>
                <td><img src="${staff.avatar}" alt="${staff.name}" width="45" height="45" class="rounded-circle"></td>
                <td>${staff.name}</td>
                <td>${staff.gender}</td>
                <td>${formattedBirthday}</td>
            </tr>`;
            staffTableBody.innerHTML += row;
        });
    }
}

getStaff(handleStaff);