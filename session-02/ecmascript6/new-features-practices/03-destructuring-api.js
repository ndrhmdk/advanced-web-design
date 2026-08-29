async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        // Check if the response is successful or not
        if (!response.ok) {
            throw new Error("Network response didn't succeed.");
        }

        const userData = await response.json();
        console.log(userData);

        // Destructuring
        const {id, name, email, address: {street, city}} = userData;

        console.log("\nInfomation fetch:")
        // Print the destructured info
        console.log(`ID: ${id}`);
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Street: ${street}`);
        console.log(`City: ${city}`);
    } catch (error) {
        console.error('Error fetching user data: ', error)
    }
}

fetchUserData();