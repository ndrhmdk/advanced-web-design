// SCOPE
//      Global
//          Function
//              Block
//                  Code

var globalVar = "Global Var";
const globalConst = "Global Const";

// Function Scope
function theFunction() {
    var functionVar = "Function Var";
    const funcitonConst = "Function Const";

    // Block Scope
    if (true) {
        let blockLet = "Block Let";
        const blockConst = "Block Const";
        var blockVar = "Block Var";

        console.log("Block Scope");
        console.log(blockLet); 
        console.log(blockConst);
        console.log(blockVar);
        console.log(functionVar);
        console.log(funcitonConst);
        console.log(globalVar);
        console.log(globalConst);
    }


    console.log("\nFunction Scope");
    // console.log(blockLet);   // Cannot
    // console.log(blockConst); // Cannot
    console.log(blockVar);
    console.log(functionVar);
    console.log(funcitonConst);
    console.log(globalVar);
    console.log(globalConst);    
}

theFunction();

console.log("\nGLobal Scope");
// console.log(blockLet);   // Cannot
// console.log(blockConst); // Cannot
// console.log(blockVar);   // Cannot
// console.log(functionVar);    // Cannot
// console.log(funcitonConst);  // Cannot
console.log(globalVar);         
console.log(globalConst);    