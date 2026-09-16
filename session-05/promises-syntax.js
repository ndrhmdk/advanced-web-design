function sumNumbers(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a !== 'number' || typeof b !== 'number') 
            reject("Both have to be a number.")
        else {
            const sum = a + b;
            resolve(sum);
        }
    })
}

const a = 5;
const b = 3;
sumNumbers(a, b)
    .then(sum => {
        console.log(`Sum of ${a} and ${b} is ${sum}`);
    }).catch(error => {
        console.error(error);
    })