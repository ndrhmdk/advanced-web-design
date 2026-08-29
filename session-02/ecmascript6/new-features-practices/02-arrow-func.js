var a = 7;

// with param
var checkOddEvenParam = (number) => {
    if (number % 2 == 0) {
        console.log(`${number} is an even number.`);
    } else {
        console.log(`${number} is an odd number.`);
    }
}
checkOddEvenParam(a);

// without param
var checkOddEvenWithoutParam = () => {
    if (a % 2 == 0) {
        return a + " is an even number."
    } else {
        return a + " is an odd number."
    }
}
console.log(checkOddEvenWithoutParam());