const asyncHandler = require("express-async-handler");
const Genre = require("../models/mysql/genre.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = Genre(mySQLSequelize);


const getGenres = asyncHandler(async (req, res) => {
  const genres = await operation.findAll();
  res.status(200).json(genres);
});

const createGenre = asyncHandler(async (req, res) => {
  const { title, description} = req.body;

  if (!title) {
    res.status(400).send();
    throw new Error("Please add genre");
  }

  const genre = {
    title,
    description,
    created_at: new Date(),
  };

  await Genre(mySQLSequelize)
    .create(genre)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Genre.",
      })
    );
});

const updateGenre = asyncHandler(async (req, res) => {});

const deleteGenre = asyncHandler(async (req, res) => {});

module.exports = {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
