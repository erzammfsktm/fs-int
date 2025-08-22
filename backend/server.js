import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static("public"));

// MySQL connection
const db = mysql.createConnection({
  host: "YOUR_DB_HOST",
  user: "YOUR_DB_USER",
  password: "YOUR_DB_PASSWORD",
  database: "internships"
});

db.connect(err => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to MySQL!");
});

// API: get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) res.status(500).json({ error: err });
    else res.json(results);
  });
});

// API: add new student
app.post("/students", (req, res) => {
  const { name, email, coordinator_id, faculty_supervisor_id, industry_supervisor_id } = req.body;
  db.query(
    "INSERT INTO students (name, email, coordinator_id, faculty_supervisor_id, industry_supervisor_id) VALUES (?, ?, ?, ?, ?)",
    [name, email, coordinator_id, faculty_supervisor_id, industry_supervisor_id],
    (err, result) => {
      if (err) res.status(500).json({ error: err });
      else res.json({ id: result.insertId, ...req.body });
    }
  );
});

// Fallback: serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
