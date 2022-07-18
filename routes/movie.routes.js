const express = require('express');
const router = express.Router();
const { getMovies, createMovie, updateMovie, deleteMovie, searchMovies } = require('../controllers/movie.controller')

router.get('/', getMovies);
router.get('/:search', searchMovies);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.put('/:id', deleteMovie);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;