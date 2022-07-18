
//importing mongoose
const mongoose = require("mongoose");

let directorSchema = mongoose.Schema({
  Directorid: { type: Number, required: true },
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birthday: Date,
  Death: Date,
});

let Director = mongoose.model("Director", directorSchema);
module.exports.Director = Director;
