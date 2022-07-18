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

const searchActors = asyncHandler(async (req, res) => {
  const searchParam = req.params.search;
  const allActors = await operation.findAll();

  const filteredActors = allActors.filter((actor) =>
    actor.name.toLowerCase().includes(searchParam.toString().toLowerCase())
  );

  if (filteredActors && filteredActors.length < 1) {
    res.status(400);
    throw new Error("Search not found! try again.");
  }

  res.send(filteredActors);
});

const createActor = asyncHandler(async (req, res) => {
  const { name, bio, avatar, birthyear, deathyear } = req.body;

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
    created_at: new Date(),
  };

  await operation
    .create(actor)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      })
    );
});

const updateActor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const actor = await operation.findByPk(id);

  if (!actor) {
    res.status(400);
    throw new Error("actor not found!");
  }

  await operation
    .update(req.body, {
      where: { id: id },
    })
    .then(async (num) => {
      const updatedActor = await operation.findByPk(id);
      res.send({
        message: "Tutorial was updated successfully.",
        data: updatedActor,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
        data: error,
      });
    });
});

const deleteActor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const actor = await operation.findByPk(id);

  if (!actor) {
    res.status(400);
    throw new Error("actor not found!");
  }

  await operation
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      res.status(200).send({
        message: `Actor: ${actor.name} was deleted successfully!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Could not delete Actor: ${actor.name}`,
      });
    });
});

module.exports = {
  getActors,
  searchActors,
  createActor,
  updateActor,
  deleteActor,
};
