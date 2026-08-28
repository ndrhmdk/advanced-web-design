// a promise represents an asynchronous operation that eventually completes or fails
const fetchData = () => {
    return new Promise((resolve, reject) => {
        // simulate a 2-second async operation
        setTimeout(() => {
            // resolve the promise successfully with data
            resolve("Data received");
        }, 2000);
    });
};

// handle the fulfilled value with .then()
fetchData().then((data) => {
    console.log(data);  // Data received (after 2 seconds)
})