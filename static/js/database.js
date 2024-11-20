const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the SQLite database
const dbPath = path.resolve(__dirname, 'patients.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create patients table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    condition TEXT NOT NULL,
    lastVisit TEXT NOT NULL,
    ctScanPath TEXT NOT NULL
  );
`);

// Function to insert a new patient into the database
const insertPatient = (patient) => {
  const { id, name, age, condition, lastVisit, ctScanPath } = patient;
  const sql = `
    INSERT INTO patients (id, name, age, condition, lastVisit, ctScanPath)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [id, name, age, condition, lastVisit, ctScanPath], (err) => {
    if (err) {
      console.error('Error inserting patient:', err);
    } else {
      console.log('Patient added successfully');
    }
  });
};

// Function to retrieve all patients
const getPatients = (callback) => {
  const sql = 'SELECT * FROM patients';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving patients:', err);
    } else {
      callback(rows);
    }
  });
};

// Function to get a patient by ID
const getPatientById = (id, callback) => {
  const sql = 'SELECT * FROM patients WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Error retrieving patient:', err);
    } else {
      callback(row);
    }
  });
};

// Exporting the database methods
module.exports = {
  insertPatient,
  getPatients,
  getPatientById,
};