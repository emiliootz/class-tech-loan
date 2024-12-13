/*****************************
 *       Configuration       *
 *****************************/

/*
    This is the configuration file for setting up all the information needed in the .env file.
    Create a .env file and input:

    GOOGLE_CLIENT_ID=<Your-Google-Client-ID>
    GOOGLE_CLIENT_SECRET=<Your-Google-Client-Secret>
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/callback
    MONGO_URL_PASSPORT_GOOGLE=mongodb://<localhost or 127.0.0.1>:27017/passport-google
    MONGO_URL_FACULTY_TECH_LENDING=mongodb://<localhost or 127.0.0.1>:27017/faculty-tech-lending
    SESSION_SECRET=<secret>
    PORT=<port>

*/
/*****************************/

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
