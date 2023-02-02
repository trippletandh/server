const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUserById,
  getUserStats,
} = require("../controllers/userController");

//GET USER by ID
router.get("/find/:id", getUserById);

//UPDATE user by ID
router.put("/:id", updateUser);

//DELETE user by ID
router.delete("/:id", deleteUser);

//GET USER STATS
router.get("/stats", getUserStats);

module.exports = router;
