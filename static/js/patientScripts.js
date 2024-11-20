document.addEventListener("DOMContentLoaded", () => {
  // Check if user session exists
  const user = JSON.parse(localStorage.getItem("user"));

  // If no session, prevent access and clear history
  if (!user) {
    document.body.innerHTML = '<h1>You are not authorized to view this page.</h1>';
    alert("Unauthorized access! You will be redirected to the login page.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
    return;
  }

  // Get elements from DOM
  const addPatientBtn = document.getElementById("add-patient-btn");
  const searchBar = document.getElementById("search-bar");
  const patientList = document.getElementById("patient-list");

  // Get popup elements
  const popupContainer = document.getElementById("popup-container");
  const closePopupBtn = document.getElementById("close-popup");
  const addPatientForm = document.getElementById("add-patient-form");

  // Function to generate new patient ID (automatically)
  const generateNewPatientId = () => {
    // Find all patient IDs in the table
    const patientRows = patientList.querySelectorAll("tr");
    let highestId = 0;

    // Loop through each row and extract the numeric part of the patient ID (e.g., "PT001")
    patientRows.forEach((row) => {
      const patientId = row.cells[0]?.textContent; // Assuming ID is in the first cell
      if (patientId && patientId.startsWith("PT")) {
        const numericPart = parseInt(patientId.substring(2)); // Extract the number part
        if (numericPart > highestId) {
          highestId = numericPart; // Update the highest ID
        }
      }
    });

    // Increment the highest ID by 1 to generate the new patient ID
    return `PT${(highestId + 1).toString().padStart(3, "0")}`;
  };

  // Function to add a new patient to the table
  const addNewPatient = (patient) => {
    const newRow = `
      <tr>
        <td>${patient.id}</td>
        <td>${patient.name}</td>
        <td>${patient.age}</td>
        <td>${patient.condition}</td>
        <td>${patient.lastVisit}</td>
        <td>
          <button class="btn-secondary view-ct-scan-btn">View CT Scan</button>
        </td>
        <td>
          <button class="btn-secondary view-btn">View</button>
          <button class="btn-danger delete-btn">Delete</button>
        </td>
      </tr>
    `;
    patientList.innerHTML += newRow;
  };

  // Open the popup when the "Add New Patient" button is clicked
  addPatientBtn.addEventListener("click", () => {
    popupContainer.style.display = "flex";  // Show the popup
  });

  // Close the popup when the "Cancel" button is clicked
  closePopupBtn.addEventListener("click", () => {
    popupContainer.style.display = "none";  // Hide the popup
  });

  // Handle the form submission for adding a new patient
  addPatientForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the patient details from the form inputs
    const newPatient = {
      id: generateNewPatientId(),  // Automatically generate patient ID
      name: document.getElementById("patient-name").value,
      age: document.getElementById("patient-age").value,
      condition: document.getElementById("patient-condition").value,
      lastVisit: new Date().toISOString().split("T")[0]
    };

    // Add the new patient to the table
    addNewPatient(newPatient);

    // Close the popup after adding the patient
    popupContainer.style.display = "none";

    // Optionally clear the form fields after submission
    addPatientForm.reset();
  });

  // Search functionality for filtering patients in the table
  searchBar.addEventListener("input", () => {
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

  // View CT Scan button functionality (open modal or display CT scan)
  patientList.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-ct-scan-btn")) {
      // Implement actual CT Scan viewing logic (e.g., open a modal or display an image)
      alert("Displaying CT Scan... (implement actual functionality)");
    }
  });

  // Delete Patient functionality (removes patient from the table)
  patientList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const row = e.target.closest("tr");
      row.remove();  // Removes the patient row from the table
    }
  });

  // Dropdown menu toggle logic for user actions
  const dropdownButton = document.getElementById("user-dropdown-btn");
  const dropdownMenu = document.getElementById("user-dropdown-menu");

  dropdownButton?.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  // Logout functionality (clears session and redirects to login page)
  const logoutLink = document.getElementById("logout-link");
  logoutLink?.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
});