const express = require('express');
const router = express.Router();
const { getDirectors, createDirector, updateDirector, deleteDirector, searchDirectors } = require('../controllers/director.controller')

router.get('/', getDirectors);
router.get('/:search', searchDirectors);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.put('/:id', deleteDirector);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;