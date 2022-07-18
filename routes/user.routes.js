const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, searchUsers } = require('../controllers/user.controller')

router.get('/', getUsers);
router.get('/:search', searchUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:id', deleteUser);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;