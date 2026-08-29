var arr = ["Hello", "I", "am", "Sarah"];
var [greeting,,,name] = arr;
var [sth,...intro] = arr;

console.log(greeting + " " + name);
console.log(sth);
console.log(intro);