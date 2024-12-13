require('dotenv').config(); // Load the .env

const config = {
   
    app: {
        port: process.env.PORT,
    },
    
    db: {
        passportMongoUrl: process.env.MONGO_URL_PASSPORT_GOOGLE,
        mongoUrl: process.env.MONGO_URL_FACULTY_TECH_LENDING,
    },
   
    passport: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
    },
    
    session: {
        secret: process.env.SESSION_SECRET,
        collectionName: 'sessions',
        cookieMaxAge: 1000 * 60 * 60 * 24, // Set cookie max to 1 day
    },
};

module.exports = config;
