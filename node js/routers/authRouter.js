const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

// התחברות רגילה
router.post("/login", authController.login);
router.post("/register", authController.register);

// התחברות עם גוגל
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// חזרה מגוגל
router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: true,
    }),
    (req, res) => {
        // ברירת מחדל: מפנה ללקוח אחרי התחברות
        res.redirect("http://localhost:5173/HomePage");
    }
);

// בדיקה אם מחובר
router.get("/user", (req, res) => {
    res.send(req.user || null);
});

// יציאה מהחשבון
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

module.exports = router;





