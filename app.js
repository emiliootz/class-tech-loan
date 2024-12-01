/**
 * This file is the core of the Class-Tech-Loan application,
 * determining which webpage a user should be directed to.
 * 
 */
require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const { UserModel, ItemModel, LoanModel } = require('./config/database');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
const mongoose = require('mongoose');


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL_PASSPORT_GOOGLE, collectionName: "sessions" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require('./config/passport');

app.use(passport.initialize())
app.use(passport.session())

// check user role
const requireRole = (role) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
      }
      if (req.user.role !== role) {
        return res.status(403).send({ msg: "Forbidden: Insufficient permissions" });
      }
      next();
    };
  };
  
  // allow multiple roles
  const requireRoles = (roles) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).send({ msg: "Forbidden: Insufficient permissions" });
      }
      next();
    };
  };

  app.listen(3000, (req, res) => {
    console.log("Listening to port 3000");
})
  
  /** Define Routers:
   *  - authRouter : Contains all routes related to user authentication and user data.
   *  - adminRouter : Contains all routes related to administration.
   *  - cartRouter : Contains all routes related to the user's cart.
   *  - itemRouter : Contains all routes related to the management of items.
   *  - loanedItemsRouter : Contains all routes related to the viewing and management of loaned items.
   * */
  const authRouter = require('./routes/auth')
  app.use('/', authRouter)

  const adminRouter = require('./routes/admin')
  app.use('/', adminRouter)

  const cartRouter = require('./routes/cart')
  app.use('/', cartRouter)

  const itemRouter = require('./routes/item')
  app.use('/', itemRouter)

  const loanedItemsRouter = require('./routes/loanedItems')
  app.use('/', loanedItemsRouter)