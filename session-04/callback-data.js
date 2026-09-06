function fetchDataFromMockAPI(callback) {
    const apiURL = "https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/staffs";
    fetch(apiURL) 
        .then(response => response.json())
        .then(data => {
            callback(null, data);
        })
        .catch(error => {
            callback(error.null);
        });
}

function handleAPIData(error, data) {
    if (error) {
        console.log("Error while fetching data from API: ", error);
    } else {
        console.log("Data fetched from API:");
        console.log(JSON.stringify(data, null, 2));
    }
}

fetchDataFromMockAPI(handleAPIData);