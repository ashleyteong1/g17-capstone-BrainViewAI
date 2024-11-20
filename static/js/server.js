const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const database = require('./database');  // Import the database helper

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    cb(null, `${Date.now()}${fileExt}`);
  }
});

const upload = multer({ storage: storage });

// Route to handle patient data and CT scan upload
app.post('/add-patient', upload.single('ctScanFile'), (req, res) => {
  const { name, age, condition, lastVisit } = req.body;
  const ctScanFile = req.file;

  if (!ctScanFile) {
    return res.status(400).send('CT scan file is required');
  }

  // Generate patient ID (for simplicity, just using current timestamp)
  const patientId = `PT${Date.now()}`;

  const patient = {
    id: patientId,
    name,
    age,
    condition,
    lastVisit,
    ctScanPath: path.join('uploads', ctScanFile.filename),  // Store the file path
  };

  // Insert patient info into the database
  database.insertPatient(patient);

  res.status(200).send('Patient added successfully');
});

// Route to get all patients
app.get('/patients', (req, res) => {
  database.getPatients((patients) => {
    res.json(patients);
  });
});

// Route to get a specific patient by ID
app.get('/patients/:id', (req, res) => {
  const patientId = req.params.id;
  database.getPatientById(patientId, (patient) => {
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send('Patient not found');
    }
  });
});

// Serve static files (CT scan images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});