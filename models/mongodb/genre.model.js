//importing mongoose
const mongoose = require("mongoose");

let genreSchema = mongoose.Schema({
  Genreid: { type: Number, required: true },
  Name: { type: String, required: true },
  Description: { type: String, required: true },
});


let Genre = mongoose.model("Genre", genreSchema);


module.exports.Genre = Genre;
