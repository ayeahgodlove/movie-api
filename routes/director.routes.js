const express = require('express');
const router = express.Router();
const { getDirectors, createDirector, updateDirector, deleteDirector } = require('../controllers/director.controller')

router.get('/', getDirectors);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.put('/:id', deleteDirector);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;