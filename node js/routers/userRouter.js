const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const { getUserbyName, getUserbyId,getAllUsers } = require("../controllers/userController");

router.get("/getUserByName/:userName", getUserbyName);
router.get("/getUserById/:id", getUserbyId);
router.post("/");

router.get("/getAllUsers", getAllUsers);

router.get("/me", authenticateJWT, (req, res) => {
  res.send({
    id: req.user.id,
    userName: req.user.userName,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
