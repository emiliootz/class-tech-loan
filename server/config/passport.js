// passport.js

require('dotenv').config(); // Load environment variables
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { UserModel } = require('./database');  // Destructure to get UserModel

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
}));

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
