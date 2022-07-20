const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  loginUser,
  getProfile,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/authMiddle");

router.get("/", protect,getUsers);
router.get("/search/:search", protect,searchUsers);
router.post("/", createUser);
router.put("/:id", protect,updateUser);
router.put("/:id", protect,deleteUser);
router.post("/login", loginUser);
router.get("/profile", protect,getProfile);

// router.route('/').get(protect, getGoals).post(protect, createGoal);

// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
