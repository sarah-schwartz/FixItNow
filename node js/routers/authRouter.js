const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");
const jwt = require('jsonwebtoken');

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
        console.log("jjj")
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
        if(!token)
            console.log("error")
        console.log(token)
        // ברירת מחדל: מפנה ללקוח אחרי התחברות
        res.redirect(`http://localhost:5173/HomePage?token=${token}`);
    }
);

// router.get('/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: '/login' }),
//   (req, res) => {
//     // שליחה של הטוקן לריאקט
//     const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    
//     // או שליחה ל־React ע"י הפנייה עם הטוקן בפרמטר
//     res.redirect(`http://localhost:5173/HomePage?token=${token}`);
//   }
// );

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





