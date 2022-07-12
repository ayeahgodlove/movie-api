const express = require("express");
const morgan = require("morgan");
const fs = require("fs"); // import built in node modules fs
const path = require("path"); // and path
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.config");
const PORT = process.env.PORT;

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static('public'));

// call database connection
connectDB();

// app documentation routes
app.get("/documentation", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.use('/api/movies', require('./routes/movie.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/directors', require('./routes/director.routes'));
app.use('/api/actors', require('./routes/actor.routes'));
app.use('/api/genres', require('./routes/genre.routes'));
app.use('/api/tvshows', require('./routes/tvshow.routes'));
// listen on port
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}.`);
});
