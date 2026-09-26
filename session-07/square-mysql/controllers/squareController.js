const squareModel = require('../models/square');  												

// Controller để hiển thị form  												
exports.showForm = async (req, res) => {
    try {
        const squares = await squareModel.getAllSquares();
        res.render('index', { perimeter: null, area: null, squares });
    } catch (error) {
        console.error('Error loading data from database', error);
        res.status(500).send('Server Error');
    }
};

// Controller để tính chu vi và diện tích và lưu vào MySQL  												
exports.calculateSquare = async (req, res) => {  												
    const { sideLength } = req.body;
    
    const perimeter = 4 * sideLength;  												
    const area = sideLength * sideLength;
    
    try {  												
        await squareModel.saveSquareData(sideLength, perimeter, area);  																		
        const squares = await squareModel.getAllSquares();
        res.render('index', { perimeter, area, squares });
    } catch (error) {  												
        console.error('Error saving to database', error);  												
        res.status(500).send('Server Error');  												
    }  												
};
