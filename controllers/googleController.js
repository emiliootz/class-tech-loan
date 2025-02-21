const passport = require("passport");
const UserModel = require("../config/database").UserModel;

const LOGIN_ROUTE = "/login";
const PROTECTED_ROUTE = "/protected";
const LOGOUT_ROUTE = "/";

/**
 * Initiates Google authentication.
 */
exports.googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

/**
 * Handles the Google authentication callback.
 */
exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", async (err, googleUser, info) => {
    if (err) return next(err);
    if (!googleUser) return res.redirect(LOGIN_ROUTE);

    try {
      // Find user by email (Google returns profile.emails[0].value)
      let existingUser = await UserModel.findOne({ email: googleUser.email });

      if (existingUser) {
        // If the user exists but has no Google ID, update it
        if (!existingUser.googleId) {
          existingUser.googleId = googleUser.googleId;
          await existingUser.save();
        }
      } else {
        // If the user doesn't exist, create a new one
        existingUser = new UserModel({
          name: googleUser.name || googleUser.displayName,
          email: googleUser.email,
          googleId: googleUser.googleId,
          role: "user", // Default role, can be changed by an admin later
          disabled: false,
        });
        await existingUser.save();
      }

      // Log the user in and redirect to dashboard
      req.logIn(existingUser, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.redirect(PROTECTED_ROUTE);
      });
    } catch (dbError) {
      return next(dbError);
    }
  })(req, res, next);
};

/**
 * Logs the user out.
 */
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(LOGOUT_ROUTE);
  });
};
