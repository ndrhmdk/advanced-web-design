if (true) {
    // variables declared with 'let' are scoped strictly to the enclosing block {}
    let x = 10;
    console.log(x);
}

// accessing 'x' outside its block throws: ReferenceError 
console.log(x);