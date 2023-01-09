const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
  getUserStats,
} = require("../controllers/userController");

//UPDATE user by ID
router.put("/:id", updateUser);

//DELETE user by ID
router.delete("/:id", deleteUser);

//GET USER by ID
router.get("/find/:id", getUserById);

//GET ALL USER
router.get("/", getAllUser);

//GET USER STATS
router.get("/stats", getUserStats);

module.exports = router;
