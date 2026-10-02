const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const routes = require("./routes/index");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});