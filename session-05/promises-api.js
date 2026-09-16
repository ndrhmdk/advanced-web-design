function getUsers() {
    return new Promise((resolve, reject) => {
        fetch('https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/staffs')
            .then(response => {
                if (!response.ok) throw new Error("Cannot fetch data from API.");
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

getUsers()
    .then(data => {
        console.log("Number of users:", data.length);
        console.log("Users:\n", data);
    }).catch(error => {
        console.error("Error:", error);
    })