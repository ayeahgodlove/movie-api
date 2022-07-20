const express = require('express');
const router = express.Router();
const { getGenres, createGenre, updateGenre, deleteGenre, searchGenres } = require('../controllers/genre.controller')
const { protect } = require("../middleware/authMiddle");

router.get('/', protect,getGenres);
router.get('/:search', protect,searchGenres);
router.post('/', protect,createGenre);
router.put('/:id', protect,updateGenre);
router.put('/:id', protect,deleteGenre);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;