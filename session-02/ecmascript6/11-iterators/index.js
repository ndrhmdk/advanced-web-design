const arr = [1, 2, 3];
// retrieve the built-in iterator via Symbol.iterator
const iterator = arr[Symbol.iterator]();

console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3