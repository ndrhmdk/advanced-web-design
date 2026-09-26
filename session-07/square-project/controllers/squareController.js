const Square = require("../models/square");

exports.showForm = (req, res) => {
  res.render("index", {
    perimeter: null,
    area: null,
  });
};

exports.calculateSquare = async (req, res) => {
  try {
    const sideLength = Number(req.body.sideLength);
    const perimeter = 4 * sideLength;
    const area = sideLength * sideLength;

    // creates a MongoDB document
    const square = new Square({ sideLength, perimeter, area });
    // inserts into MongoDB
    await square.save();
    console.log(`sideLength=${sideLength} has been added to the database.`);

    res.render("index", { perimeter, area });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
};
