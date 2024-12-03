/**
 * This file is the core of the Class-Tech-Loan application,
 * determining which webpage a user should be directed to.
 * 
 * To start up the server locally, copy and run the following command in terminal: node server
 *
 */
require("dotenv").config(); // Load environment variables
const express = require("express");
const app = express();
const session = require("express-session"); // Middleware to allow the creation and storage of session data
const MongoStore = require("connect-mongo");

// In order for our front-end to be able to call our back-end from a web browser
// it must be compliant with the CORS policy enforced by the browser
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
}

app.set("view engine", "ejs"); // The engine tells the code to use the ejs files in the views folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(cors(corsOptions));


// API url for testing
app.get("/api", (req, res) => {
  res.json({"fruits": ["orange", "apple", "banana"] })
})


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL_PASSPORT_GOOGLE,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Define Logger (This should be removed eventually)
function logger(req, res, next) {
  console.log("I have been called");
  next();
}

/** Define Routers:
 *  - authRouter : Contains all routes related to user authentication and user data.
 *  - adminRouter : Contains all routes related to administration.
 *  - cartRouter : Contains all routes related to the user's cart.
 *  - itemRouter : Contains all routes related to the management of items.
 *  - loanedItemsRouter : Contains all routes related to the viewing and management of loaned items.
 * */
const authRouter = require("./routes/auth");
app.use("/", authRouter);

const adminRouter = require("./routes/admin");
app.use("/", adminRouter);

const cartRouter = require("./routes/cart");
app.use("/", cartRouter);

const itemRouter = require("./routes/item");
app.use("/", itemRouter);

const loanedItemsRouter = require("./routes/loanedItems");
app.use("/", loanedItemsRouter);


// This line of code tells the server to run on Port 8080 and wait for something to happen indefinitely.
// If we change this back to port 3000 then the server-side Google OAuth should work again
app.listen(8080, (req, res) => {
  console.log("Listening to port 8080");
});