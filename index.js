const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const homeRoute = require("./routes/homeRoute");
const productRoute = require("./routes/productRoute");
const config = require("./config/");
const reviewRoute = require("./routes/reviewRoute");
// const logger = require("./utils/appLogger");

mongoose.set("strictQuery", false);

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

const dir = path.join(__dirname, "logs");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const filePath = path.join(__dirname, "logs", "request.log");
const stream = fs.createWriteStream(filePath, { flags: "a" }); // Appending logs to request.log

app.use(morgan("dev", { stream: stream }));

app.listen(PORT, () => console.log(`Server is running on ${PORT}!`));

mongoose.connect(config.dbConStr, (err, result) => {
  if (!err) {
    console.log("DB Connected!");
  } else {
    console.log(err);
  }
});

app.use("/", homeRoute);
app.use("/api/products/", productRoute);
app.use("/api/reviews/", reviewRoute);

// Logging
// Request, Application
// Levels: info, warning, Err, debug
