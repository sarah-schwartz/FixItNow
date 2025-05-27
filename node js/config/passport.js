const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined;

        user = await User.create({
          
          userName: profile.displayName,
          email: email,
          googleId: profile.id,
          role: "developer",
          picture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : undefined
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
