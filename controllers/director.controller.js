const asyncHandler = require("express-async-handler");
const Director = require("../models/mysql/director.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = Director(mySQLSequelize);

const getDirectors = asyncHandler(async (req, res) => {
  const directors = await operation.findAll();
  res.status(200).json(directors);
});

const searchDirectors = asyncHandler(async (req, res) => {
  const searchParam = req.params.search;
  const allDirectors = await operation.findAll();

  const filteredDirectors = allDirectors.filter((director) =>
    director.name.toLowerCase().includes(searchParam.toString().toLowerCase())
  );

  if (filteredDirectors && filteredDirectors.length < 1) {
    res.status(400);
    throw new Error("Search not found! try again.");
  }

  res.send(filteredDirectors);
});

const createDirector = asyncHandler(async (req, res) => {
  const { name, bio, avatar, birthyear, deathyear } = req.body;

  if (!name) {
    res.status(400).send();
    throw new Error("Please add actor name");
  }

  const director = {
    name,
    bio,
    avatar,
    birthyear: new Date(),
    deathyear: new Date(),
    created_at: new Date(),
  };

  await Director(mySQLSequelize)
    .create(director)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      })
    );
});

const updateDirector = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const director = await operation.findByPk(id);

  if (!director) {
    res.status(400);
    throw new Error("director not found!");
  }

  await operation
    .update(req.body, {
      where: { id: id },
    })
    .then(async (num) => {
      const updatedDirector = await operation.findByPk(id);
      res.send({
        message: "Director was updated successfully.",
        data: updatedDirector,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Director with id=" + id,
        data: error,
      });
    });
});

const deleteDirector = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const director = await operation.findByPk(id);

  if (!director) {
    res.status(400);
    throw new Error("director not found!");
  }

  await operation
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.status(200).send({
        message: `Director: ${director.name} was deleted successfully!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Could not delete Director: ${director.name}`,
      });
    });
});

module.exports = {
  getDirectors,
  searchDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
};
