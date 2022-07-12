const express = require("express");
const morgan = require("morgan");
const fs = require("fs"); // import built in node modules fs
const path = require("path"); // and path
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.config");
const PORT = process.env.PORT;

const app = express();

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

// call database connection
connectDB();

// app routes
app.get("/documentation", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

// listen on port
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}.`);
});
