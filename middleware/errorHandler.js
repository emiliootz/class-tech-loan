const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack || err.message || err);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;