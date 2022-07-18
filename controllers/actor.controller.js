const asyncHandler = require("express-async-handler");
const Actor = require("../models/mysql/actor.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = Actor(mySQLSequelize);
const actors = [
  {
    actorId: 0,
    name: "Thriller",
    bio: "Seek ye first the kingdom of God and it's righteousness",
    birthdate: new Date(),
    death: new Date(),
    imageUrl: "",
  },
  {
    actorId: 0,
    name: "Horror",
    bio: "Seek ye first the kingdom of God and it's righteousness",
    birthdate: new Date(),
    death: new Date(),
    imageUrl: "",
  },
  {
    actorId: 0,
    name: "Comedy",
    bio: "Seek ye first the kingdom of God and it's righteousness",
    birthdate: new Date(),
    death: new Date(),
    imageUrl: "",
  },
];

const getActors = asyncHandler(async (req, res) => {
  const actors = await operation.findAll();
  res.status(200).json(actors);
});

const getActor = asyncHandler(async (req, res) => {
  res.status(200).json(movies);
});

const createActor = asyncHandler(async (req, res) => {
  const { name, bio, avatar, birthyear, deathyear } =
    req.body;

  if (!name) {
    res.status(400).send();
    throw new Error("Please add actor name");
  }

  const actor = {
    name,
    bio,
    avatar,
    birthyear: new Date(),
    deathyear: new Date(),
    created_at: new Date()
  };

  await operation.create(actor)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      })
    );
});

const updateActor = asyncHandler(async (req, res) => {});

const deleteActor = asyncHandler(async (req, res) => {});

module.exports = {
  getActors,
  createActor,
  updateActor,
  deleteActor,
};
