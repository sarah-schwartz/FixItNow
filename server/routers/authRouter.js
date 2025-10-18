const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require("../middleware/auth");
const User = require("../models/User");

// התחברות רגילה
router.post("/login", authController.login);
router.post("/register", authController.register);

// התחברות עם גוגל
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// חזרה מגוגל
router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    async (req, res) => {
        console.log("Google callback reached");

        try {
            const user = await User.findById(req.user._id);

            const token = jwt.sign({
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                picture: user.picture,
            }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
                path: '/'
            });

            res.redirect("http://localhost:5173/HomePage");
        } catch (err) {
            console.error("Google auth error:", err);
            res.redirect("http://localhost:5173/login?error=auth_failed");
        }
    }
);

// בדיקה אם מחובר
router.get("/user", authenticateJWT, (req, res) => {
    res.send(req.user);
});

// יציאה מהחשבון
router.get("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        path: '/'
    });

    req.logout();
    res.json({ message: "Logged out successfully" });
});

// קבלת פרטי המשתמש מהטוקן
router.get("/me", authenticateJWT, (req, res) => {
    res.json({
        id: req.user.id,
        userName: req.user.userName,
        email: req.user.email,
        role: req.user.role,
    });
});

module.exports = router;
