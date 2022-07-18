const asyncHandler = require("express-async-handler");
const Director = require("../models/mysql/director.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = Director(mySQLSequelize);

const getDirectors = asyncHandler(async (req, res) => {
  const directors = await operation.findAll();
  res.status(200).json(directors);
});

const getDirector = asyncHandler(async (req, res) => {
  // res.status(200).json(directors);
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

const updateDirector = asyncHandler(async (req, res) => {});

const deleteDirector = asyncHandler(async (req, res) => {});

module.exports = {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector,
};
