import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "YOUR_DB_HOST",
  user: "YOUR_DB_USER",
  password: "YOUR_DB_PASSWORD",
  database: "internships"
});

// Test connection
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

app.listen(5000, () => console.log("Server running on port 5000"));
