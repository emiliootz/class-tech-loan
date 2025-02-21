const config = require("./config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { UserModel } = require("./database");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.passport.google.clientID,
      clientSecret: config.passport.google.clientSecret,
      callbackURL: config.passport.google.callbackURL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails[0].value;

        // Check if user exists by email first (including manually added users)
        let user = await UserModel.findOne({ email });

        if (user) {
          // If user exists but has no googleId, update it
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        } else {
          // If user does not exist, create a new one
          user = new UserModel({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
            role: "user", // Default role, can be changed later by an admin
            disabled: false,
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
