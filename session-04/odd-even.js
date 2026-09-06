function checkOddEven(number, callback) {
    if (number % 2 == 0) {
        callback(true);
    } else {
        callback(false);
    }
}

function handleOddEvenResult(result) {
    console.log(`The number is ${result ? "even" : "odd"}.`);
}

const number01 = 1010101;
checkOddEven(number01, handleOddEvenResult);

const number02 = 1010100;
checkOddEven(number02, handleOddEvenResult)