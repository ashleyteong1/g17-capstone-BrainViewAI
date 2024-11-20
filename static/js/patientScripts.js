document.addEventListener("DOMContentLoaded", () => {
  // Check if user session exists
  const user = JSON.parse(localStorage.getItem("user"));
  
  // If no session, redirect to login page
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Get DOM elements
  const addPatientBtn = document.getElementById("add-patient-btn");
  const searchBar = document.getElementById("search-bar");
  const patientList = document.getElementById("patient-list");

  // Initialize the patients array from localStorage, or start with an empty array
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  let nextPatientId = localStorage.getItem("nextPatientId") || 1; // Start from 1 or fetch from localStorage

  // Function to render the patient list (appends data without clearing hardcoded rows)
  const renderPatients = () => {
    if (!patientList) return;

    // Clear the patient list before re-rendering (to avoid duplicates)
    patientList.innerHTML = '';

    // Render all the patients from the stored data, appending to the existing rows
    patients.forEach(patient => {
      const newRow = `
        <tr>
          <td>${patient.id}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.condition}</td>
          <td>${patient.lastVisit}</td>
          <td class="actions">
            <button class="btn-secondary" onclick="viewCTScan('${patient.id}')">View CT Scan</button>
            <button class="btn-secondary" onclick="viewPatient('${patient.id}')">View</button>
            <button class="btn-danger" data-id="${patient.id}">Delete</button>
          </td>
        </tr>
      `;
      patientList.innerHTML += newRow;
    });

    // Attach delete event listeners dynamically
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const patientId = e.target.getAttribute('data-id');
        deletePatient(patientId);
      });
    });
  };

  // Event to add a new patient
  addPatientBtn.addEventListener("click", () => {
    const newPatient = {
      id: `PT${nextPatientId}`,  // Use the current next ID
      name: "New Patient",
      age: 50,
      condition: "New Condition",
      lastVisit: new Date().toISOString().split("T")[0],  // Current date
    };

    // Add the new patient to the array
    patients.push(newPatient);

    // Increment and update the next patient ID
    nextPatientId++;

    // Save the updated patient list and nextPatientId to localStorage
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("nextPatientId", nextPatientId);

    // Re-render the patient list
    renderPatients();
  });

  // Search functionality
  searchBar?.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const rows = patientList.querySelectorAll("tr");

    rows.forEach((row) => {
      const cells = Array.from(row.cells);
      const matches = cells.some((cell) =>
        cell.textContent.toLowerCase().includes(query)
      );
      row.style.display = matches ? "" : "none";
    });
  });

  // Dropdown menu toggle logic for patientScripts.html
  const dropdownButton = document.getElementById("user-dropdown-btn");
  const dropdownMenu = document.getElementById("user-dropdown-menu");

  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });
  }

  // Logout functionality
  const logoutLink = document.getElementById("logout-link");
  logoutLink?.addEventListener("click", () => {
    // Clear user session from localStorage
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "login.html";
  });

  // Function to view patient details (could be expanded with a modal or a new page)
  window.viewPatient = (id) => {
    // Placeholder for view patient functionality (e.g., open a modal or navigate to another page)
    alert(`Viewing patient with ID: ${id}`);
  };

  // Function to view CT scan with a popup alert
  window.viewCTScan = (id) => {
    // For demo purposes, show an alert with patient ID for the CT scan view
    alert(`Viewing CT scan for patient with ID: ${id}`);
  };

  // Function to delete a patient
  window.deletePatient = (id) => {
    // Remove the patient from the array
    patients = patients.filter(patient => patient.id !== id);

    // Save the updated list back to localStorage
    localStorage.setItem("patients", JSON.stringify(patients));

    // Re-render the patient list
    renderPatients();
  };

  // Render the patient list on page load (appending after hardcoded rows)
  renderPatients();
});