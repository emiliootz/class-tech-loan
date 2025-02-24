/*****************************
 *       Passport Setup      *
 *****************************/

const config = require("./config"); // Import config.js
const passport = require("passport"); // Import passport
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Import for google authentication
const { UserModel } = require("./database"); // Using UserModel

/*
    Setting upp google authentication using passport Google Strategy parameters are passed in using
    config.js and information should be setup in your .env file.
 */

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
