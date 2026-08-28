// a key-value store that allows keys of any data type
const map = new Map()
map.set("name", "Alice");
console.log(map.get("name"));   // Alice

// a collection of unique values (duplicates are automatically eliminated)
const set = new Set([1, 2, 2, 3])
console.log(set);   // Set(3) {size: 3, 1, 2, 3}