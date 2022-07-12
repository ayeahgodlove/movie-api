/**
 * @desc Get movies
 * @route GET /api/movies
 * @access Private
 */
const movies = [
  {
    movieId: 0,
    title: "Welcome to Heaven",
    description: "Apostle pauls record about the third heavens",
    genre: 0,
    director: 0,
    imageUrl: '',
    featured: false
  },
  {
    movieId: 0,
    title: "Seek ye first the kingdom of God",
    description: "Seek ye first the kingdom of God and it's righteousness",
    genre: 0,
    director: 0,
    imageUrl: '',
    featured: false
  },
  {
    movieId: 0,
    title: "Coming back from America",
    description:
      "A slave taken from Africa, (Congo, Zaire) to America returns to Africa",
      genre: 0,
      director: 0,
      imageUrl: '',
      featured: false
  },
];

const getMovies = (req, res) => {
  res.status(200).json(movies);
};

const createMovie = (req, res) => {
};

const updateMovie = (req, res) => {
};

const deleteMovie = (req, res) => {
};

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
