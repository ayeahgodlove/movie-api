const express = require('express');
const router = express.Router();
const { getActors, createActor, updateActor, deleteActor } = require('../controllers/actor.controller')

router.get('/', getActors);
router.post('/', createActor);
router.put('/:id', updateActor);
router.put('/:id', deleteActor);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;