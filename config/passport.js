// passport.js

const config = require("./config"); // Import config.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { UserModel } = require("./database"); // Destructure to get UserModel

passport.use(
  new GoogleStrategy(
    {
      clientID: config.passport.google.clientID,
      clientSecret: config.passport.google.clientSecret,
      callbackURL: config.passport.google.callbackURL,
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Use async/await to find user
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          // If user doesn't exist, create a new one
          user = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
          });
          await user.save();
        }
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
