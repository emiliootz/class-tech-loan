/*****************************
 *      Error Handler        *
 *****************************/

/*
    The error handler is setup to throw errors within the program.
    to use error handler you can set it up within your routes
    Example:
    app.get("/error", (req, res, next) => {
        const error = new Error("Something went wrong!"); // throwing the error and a message
        error.status = 400; // You can setup a custom status code
        next(error); // You can pass errors to the error handler using next() 
    });

    you must pass in: 

    const errorHandler = require("./middleware/errorHandler"); 
     and
    app.use(errorHandler);

    in order to use the error handler withing your <filename>.js file. 


*/

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err.message || err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
