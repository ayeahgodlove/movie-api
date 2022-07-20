const express = require('express');
const router = express.Router();
const { getDirectors, createDirector, updateDirector, deleteDirector, searchDirectors } = require('../controllers/director.controller')
const { protect } = require("../middleware/authMiddle");

router.get('/', protect,getDirectors);
router.get('/:search', protect,searchDirectors);
router.post('/', protect,createDirector);
router.put('/:id', protect,updateDirector);
router.put('/:id', protect,deleteDirector);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;