const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/umb_lm.mccormack", (req, res) => {
  db.query("SELECT * FROM mccormack", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
});

app.get("/umb_lm.mccormack/:ID", (req, res) => {
  const equipmentId = req.params.ID;
  db.query(
    "SELECT * FROM mccormack WHERE ID = ?",
    [equipmentId],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.status(200).json(result);
    }
  );
});
