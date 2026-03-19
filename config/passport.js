/*****************************
 *       Passport Setup      *
 *****************************/

const config = require("./config"); // Import config.js
const passport = require("passport"); // Import passport
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Import for google authentication
const { UserModel } = require("./database"); // Using UserModel

const ALLOWED_DOMAIN = "umb.edu";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.passport.google.clientID,
      clientSecret: config.passport.google.clientSecret,
      callbackURL: config.passport.google.callbackURL,
      scope: ["profile", "email"],
    },

    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        const email = profile.emails?.[0]?.value || "";

        // Enforce @umb.edu domain
        if (!email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
          return cb(null, false, { message: "Only @umb.edu accounts are allowed." });
        }

        // Try to find by Google ID first
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          // Try to link to an admin-pre-created account by email
          user = await UserModel.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            // Auto-create with default role if no pre-existing record
            user = new UserModel({
              googleId: profile.id,
              name: profile.displayName,
              email,
            });
            await user.save();
          }
        }

        if (user.disabled) {
          return cb(null, false, { message: "Account has been disabled." });
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
