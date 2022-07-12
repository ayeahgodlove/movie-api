const directors = [
  {
    directorId: 0,
    name: "Thriller",
    bio: "Apostle pauls record about the third heavens",
    birthdate: new Date(),
    death: new Date(),
  },
  {
    directorId: 0,
    name: "Horror",
    bio: "Seek ye first the kingdom of God and it's righteousness",
    birthdate: new Date(),
    death: new Date(),
  },
  {
    directorId: 0,
    name: "Comedy",
    bio: "A slave taken from Africa, (Congo, Zaire) to America returns to Africa",
    birthdate: new Date(),
    death: new Date(),
  },
];

const getDirectors = (req, res) => {
  res.status(200).json(movies);
};

const createDirector = (req, res) => {
};

const updateDirector = (req, res) => {
};

const deleteDirector = (req, res) => {
};

module.exports = {
  getDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
};