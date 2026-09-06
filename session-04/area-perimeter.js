function calculateRectanglePerimeter(length, width, callback) {
    const perimeter = 2 * (length + width);
    callback(perimeter);
}

function calculateRectangleArea(length, width, callback) {
    const area = length * width;
    callback(area);
}

function handlePerimeterResult(perimeter) {
    console.log(`Perimeter of the rectangle is: ${perimeter}`);
}

function handleAreaResult(area) {
    console.log(`Area of the rectangle is: ${area}`);
}

const length = 5;
const width = 3;

calculateRectanglePerimeter(length, width, handlePerimeterResult);
calculateRectangleArea(length, width, handleAreaResult);