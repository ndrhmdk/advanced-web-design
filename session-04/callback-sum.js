function calculateSum(a, b, callback) {
    const sum = a + b;
    callback(sum);
}

function displaySum(result) {
    console.log(`Sum of 2 number is ${result}.`);
}

calculateSum(5, 3, displaySum);