const express = require('express');
const router = express.Router();
const { getGenres, createGenre, updateGenre, deleteGenre } = require('../controllers/genre.controller')

router.get('/', getGenres);
router.post('/', createGenre);
router.put('/:id', updateGenre);
router.put('/:id', deleteGenre);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;