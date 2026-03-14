const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Set up SQLite database
const db = new sqlite3.Database('form_submissions.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from parent folder
app.use(express.static(path.join(__dirname, '..')));

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required!');
  }

  db.run(
    'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving submission.');
      }
      res.send(`<h2>Form Submitted!</h2><p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`);
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});