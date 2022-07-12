const genres = [
  {
    genreId: 0,
    name: "Thriller",
    description: "Apostle pauls record about the third heavens",
  },
  {
    genreId: 0,
    name: "Horror",
    description: "Seek ye first the kingdom of God and it's righteousness",
  },
  {
    genreId: 0,
    name: "Comedy",
    description:
      "A slave taken from Africa, (Congo, Zaire) to America returns to Africa",
  },
];

const getGenres = (req, res) => {
  res.status(200).json(movies);
};

const createGenre = (req, res) => {
};

const updateGenre = (req, res) => {
};

const deleteGenre = (req, res) => {
};

module.exports = {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};