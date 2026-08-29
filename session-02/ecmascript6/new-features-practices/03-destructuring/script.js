async function fetchUserData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/");
        if (!response.ok) {throw new Error("Network response didn't succeed.");}

        const userData = await response.json();
        console.log(userData);

        const userList = document.getElementById("user-list");
        userList.innerHTML = "";

        // Loop through all users
        userData.forEach(user => {
            // Destructuring
            const {id, name, username, email, address: {street, city}} = user;

            // Print the destructured information
            console.log("\nInformation fetched:");
            console.log(`ID: ${id}`);
            console.log(`Name: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Street: ${street}`);
            console.log(`City: ${city}`);

            userList.innerHTML += `
                <div class="user-card">
                    <h2>${name}</h2>
                    <p class="username">@${username}</p>
                    <div class="info">
                        <span class="label">id</span>
                        ${id}
                    </div>
                    <div class="info">
                        <span class="label">email</span>
                        ${email}
                    </div>
                    <div class="info">
                        <span class="label">street</span>
                        ${street}
                    </div>
                    <div class="info">
                        <span class="label">city</span>
                        ${city}
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
        document.getElementById("user-list").innerHTML = `<p class="error">Failed to fetch user information.</p>`;
    }
}

fetchUserData();