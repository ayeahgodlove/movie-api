const asyncHandler = require("express-async-handler");
const Movie = require("../models/mysql/movie.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = Movie(mySQLSequelize);

/**
 * @desc Get movies
 * @route GET /api/movies
 * @access Private
 */

// Find all published movies
const getMovies = asyncHandler(async (req, res) => {
  const movies = await operation.findAll();
  res.status(200).json(movies);
});

// Find a single Tutorial with an id
const getMovie = asyncHandler(async (req, res) => {
  res.status(200).json(movies);
});

const createMovie = asyncHandler(async (req, res) => {
  const { title, description, img_path, genreId, directorId, actorId } = req.body;

  if (!title) {
    res.status(400).send();
    throw new Error("Please add movie title");
  }

  const movie = {
    title,
    description,
    img_path,
    published: new Date(),
    created_at: new Date(),
    genreId: 1,
    directorId: 1,
    actorId: 1,
  };

  await Movie(mySQLSequelize).create(movie)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      })
    );
});

const updateMovie = (req, res) => {};

const deleteMovie = (req, res) => {};

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
