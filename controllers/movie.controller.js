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
const searchMovies = asyncHandler(async (req, res) => {
  const searchParam = req.params.search;
  const allMovies = await operation.findAll();

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchParam.toString().toLowerCase())
  );

  if (filteredMovies && filteredMovies.length < 1) {
    res.status(400);
    throw new Error("Search not found! try again.");
  }

  res.send(filteredMovies);
});


const createMovie = asyncHandler(async (req, res) => {
  const { title, description, imgPath, genreId, directorId, actorId, videoPath, banner } =
    req.body;

  if (!title) {
    res.status(400).send();
    throw new Error("Please add movie title");
  }

  const movie = {
    title,
    description,
    imgPath,
    videoPath,
    banner,
    published,
    created_at: new Date(),
    genreId,
    directorId,
    actorId,
  };

  await Movie(mySQLSequelize)
    .create(movie)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      })
    );
});

const updateMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const movie = await operation.findByPk(id);
  if (!movie) {
    res.status(400);
    throw new Error("Movie not found!");
  }
  await operation
    .update(req.body, {
      where: { id: id },
    })
    .then(async (num) => {
      const updatedMovie = await operation.findByPk(id);
      res.status(200).send({
        message: "A Movie was updated successfully.",
        data: updatedMovie,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
        data: error,
      });
    });
});

const deleteMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const movie = await operation.findByPk(id);

  if (!movie) {
    res.status(400);
    throw new Error("movie not found!");
  }

  await operation
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.status(200).send({
        message: `Movie: ${movie.name} was deleted successfully!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Could not delete Movie: ${movie.name}`,
      });
    });
});

module.exports = {
  getMovies,
  searchMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
