const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
// const authenticateJWT = require("../middleware/auth");
const { getUserbyName, getUserbyId } = require("../controllers/userController");

router.get("/getUserByName/:userName", getUserbyName);
router.get("/getUserById/:id", getUserbyId);

console.log(authenticateJWT)

// ראוט שיחזיר את פרטי המשתמש המחובר לפי הטוקן
router.get("/me", authenticateJWT, (req, res) => {
  res.json({
    id: req.user.id,
    userName: req.user.userName,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
