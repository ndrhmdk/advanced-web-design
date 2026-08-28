// generator functions are declared with 'function*' and can yield execution
function* generateNumbers() {
    yield 1;    // pauses execution and yields 1
    yield 2;    // pauses execution and yields 2
    yield 3;    // pauses execution and yields 3
}

const gen = generateNumbers();

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3