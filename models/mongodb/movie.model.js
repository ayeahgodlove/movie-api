//importing mongoose
const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
  movieid: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genreId: { type: Number, required: true },
  directorId: { type: Number, required: true },
  actorId: { type: Number, required: true },
  img_path: { type: String, required: true },
  featured: { type: Boolean, required: false },
  create_at: {
    type: Date,
  },
  published_at: {
    type: Date,
    defaultValue: new Date(),
  },
});

let Movie = mongoose.model("Movie", movieSchema);

module.exports.Movie = Movie;
