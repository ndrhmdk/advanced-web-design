var calculateOddEvenSumParam = (number) => {
    var sum = 0;
    var oddSum = 0;
    var evenSum = 0;

    for (let i = 1; i <= number; i++) {
        if (i % 2 == 0) {
            evenSum += i;
        } else {
            oddSum += i;
        }
        sum += i;
    }

    console.log(`Sum: ${sum}`);
    console.log(`Odd sum: ${oddSum}`);
    console.log(`Even sum: ${evenSum}`);
} 

calculateOddEvenSumParam(10);


var oddSum = 0;
var evenSum = 0;
var sum = 0;
var number = 10;

var calculateOddEvenSumNoParam = () => {
    for (let i = 1; i <= number; i++) {
        if (i % 2 == 0) {
            evenSum += i;
        } else {
            oddSum += i;
        }

        sum += i;
    }
}

calculateOddEvenSumNoParam();

console.log(`Sum: ${sum}`);
console.log(`Odd sum: ${oddSum}`);
console.log(`Even sum: ${evenSum}`);
