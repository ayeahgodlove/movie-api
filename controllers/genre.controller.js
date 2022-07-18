const asyncHandler = require("express-async-handler");
const Genre = require("../models/mysql/genre.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = Genre(mySQLSequelize);

const getGenres = asyncHandler(async (req, res) => {
  const genres = await operation.findAll();
  res.status(200).json(genres);
});

const searchGenres = asyncHandler(async (req, res) => {
  const searchParam = req.params.search;
  const allGenres = await operation.findAll();

  const filteredGenres = allGenres.filter((genre) =>
    genre.title.toLowerCase().includes(searchParam.toString().toLowerCase())
  );

  if (filteredGenres && filteredGenres.length < 1) {
    res.status(400);
    throw new Error("Search not found! try again.");
  }

  res.send(filteredGenres);
});

const createGenre = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

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
        message: err.message || "Some error occurred while creating the Genre.",
      })
    );
});

const updateGenre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const genre = await operation.findByPk(id);

  if (!genre) {
    res.status(400);
    throw new Error("genre not found!");
  }

  await operation
    .update(req.body, {
      where: { id: id },
    })
    .then(async (num) => {
      const updatedGenre = await operation.findByPk(id);
      res.send({
        message: "A Genre was updated successfully.",
        data: updatedGenre,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
        data: error,
      });
    });
});

const deleteGenre = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const genre = await operation.findByPk(id);

  if (!genre) {
    res.status(400);
    throw new Error("genre not found!");
  }

  await operation
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.status(200).send({
        message: `Genre: ${genre.name} was deleted successfully!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Could not delete Genre: ${genre.name}`,
      });
    });
});

module.exports = {
  getGenres,
  searchGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
