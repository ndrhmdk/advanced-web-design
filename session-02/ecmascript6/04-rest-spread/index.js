// gathers all remaining arguments into a single array named 'numbers'
function sum(...numbers) {
    // use array reduce to compute the sum of all elements
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4));   // 10

// expands the elements of 'arr1' into the new array 'arr2'
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

console.log(arr2);      // (5) [1, 2, 3, 4, 5]