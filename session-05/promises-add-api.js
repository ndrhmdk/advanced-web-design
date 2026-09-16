function addUser(newUser) {
    return new Promise((resolve, reject) => {
        fetch('https://6a9b86aa0ad174e139e8b25f.mockapi.io/andrapi/staffs', {
            method: "POSt",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(newUser),
        }).then(response => {
            if (!response.ok) throw new Error("Cannot add this staff.");
            return response.json();
        }).then(data => {
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    })
}

const newUser = {
    name: "Robert Pattinson",
    gender: "Male",
    birthday: new Date().toISOString(),
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAWSzdYAWuu9lPUFkQNSc5MBHvLTFuYwRY4HrXEmMMtkDCmrOOHwGLmWvaafNvyk76aAugtePJqo6Flb0uN-OW-MVp4tl1V3KOOgWx_MyR&s=10"
};

addUser(newUser)
    .then(data => {
        console.log("Added new user:", data);
    })
    .catch(error => {
        console.error("Error while adding new user:", error);
    })