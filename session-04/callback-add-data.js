function addDataToAPI(url, data, callback) {
    fetch(
            url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error("Error while adding data to API.");
            }
            return response.json();
        })
        .then(result => {
            callback(null, result);
        })
        .catch(error => {
            callback(error, null);
        });
}

function handleAddDataResponse(error, result) {
    if (error) {
        console.error("Error: ", error.message);
    } else {
        console.log("Data has been added to API successfully: ", result);
    }
}

const API_URL = "https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/staffs";
const newUser = {
    name: "Alex Consani",
    gender: "Female",
    birthday: new Date().toISOString(),
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvCV9KHojanXiLNBWijHkHx8FUgjDxCU5kdH_OqsLyClwgaX88zrxmL2A&s=10"
};

addDataToAPI(API_URL, newUser, handleAddDataResponse);