
//importing mongoose
const mongoose = require("mongoose");

let actorSchema = mongoose.Schema({
  Actorid: { type: Number, required: true },
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birthday: Date,
  Death: Date,
});

let Director = mongoose.model("Actor", actorSchema);
module.exports.Director = Director;
