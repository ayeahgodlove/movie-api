const express = require('express');
const router = express.Router();
const { getMovies, createMovie, updateMovie, deleteMovie, searchMovies } = require('../controllers/movie.controller')
const { protect } = require("../middleware/authMiddle");

router.get('/', protect,getMovies);
router.get('/:search', protect,searchMovies);
router.post('/', protect,createMovie);
router.put('/:id', protect,updateMovie);
router.put('/:id', protect,deleteMovie);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;