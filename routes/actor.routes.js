const express = require('express');
const router = express.Router();
const { getActors, createActor, updateActor, deleteActor, searchActors } = require('../controllers/actor.controller')
const { protect } = require("../middleware/authMiddle");

router.get('/', protect,getActors);
router.get('/:search', protect,searchActors);
router.post('/', protect,createActor);
router.put('/:id', protect,updateActor);
router.delete('/:id', protect,deleteActor);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;