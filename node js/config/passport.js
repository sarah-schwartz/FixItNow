const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user._id); // שומר רק את ה-ID במזהה הסשן
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // טוען את המשתמש המלא מהמסד
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      const email = profile.emails?.[0]?.value;
      const picture = profile.photos?.[0]?.value;

      user = await User.create({
        userName: profile.displayName,
        email,
        googleId: profile.id,
        role: "developer",
        picture,
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));
