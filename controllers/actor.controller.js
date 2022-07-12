const actors = [
  {
    actorId: 0,
    name: "Thriller",
    bio: "Seek ye first the kingdom of God and it's righteousness",
    birthdate: new Date(),
    death: new Date(),
    imageUrl: ''
  },
  {
    actorId: 0,
    name: "Horror",
    bio: "Seek ye first the kingdom of God and it's righteousness",
    birthdate: new Date(),
    death: new Date(),
    imageUrl: ''
  },
  {
    actorId: 0,
    name: "Comedy",
    bio: "Seek ye first the kingdom of God and it's righteousness",
    birthdate: new Date(),
    death: new Date(),
    imageUrl: ''
  },
];

const getActors = (req, res) => {
  res.status(200).json(movies);
};

const createActor = (req, res) => {};

const updateActor = (req, res) => {};

const deleteActor = (req, res) => {};

module.exports = {
  getActors,
  createActor,
  updateActor,
  deleteActor,
};
