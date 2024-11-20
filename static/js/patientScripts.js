document.addEventListener("DOMContentLoaded", () => {
  const addPatientBtn = document.getElementById("add-patient-btn");
  const searchBar = document.getElementById("search-bar");
  const patientList = document.getElementById("patient-list");

  const popupContainer = document.getElementById("add-patient-popup");
  const closePopupBtn = document.getElementById("close-popup");
  const addPatientForm = document.getElementById("add-patient-form");
  const ctScanFileInput = document.getElementById("ct-scan-file");

  // Function to generate new patient ID
  const generateNewPatientId = () => {
    const patientRows = patientList.querySelectorAll("tr");
    let highestId = 0;
    patientRows.forEach((row) => {
      const patientId = row.cells[0]?.textContent;
      if (patientId && patientId.startsWith("PT")) {
        const numericPart = parseInt(patientId.substring(2));
        if (numericPart > highestId) {
          highestId = numericPart;
        }
      }
    });
    return `PT${(highestId + 1).toString().padStart(3, "0")}`;
  };

  const addNewPatient = (patient) => {
    const newRow = `
      <tr>
        <td>${patient.id}</td>
        <td>${patient.name}</td>
        <td>${patient.age}</td>
        <td>${patient.condition}</td>
        <td>${patient.lastVisit}</td>
        <td><img src="${patient.ctScanPath}" alt="CT Scan" width="100"></td>
        <td>
          <button class="btn-secondary" onclick="viewPatientDetails('${patient.id}')">View</button>
          <button class="btn-danger" onclick="deletePatient('${patient.id}')">Delete</button>
        </td>
      </tr>
    `;
    patientList.insertAdjacentHTML("beforeend", newRow);
  };

  const openAddPatientPopup = () => {
    popupContainer.style.display = "flex";
  };

  const closeAddPatientPopup = () => {
    popupContainer.style.display = "none";
  };

  const handleAddPatientFormSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      id: generateNewPatientId(),
      name: document.getElementById("patient-name").value,
      age: document.getElementById("patient-age").value,
      condition: document.getElementById("patient-condition").value,
      lastVisit: document.getElementById("patient-visit").value,
      ctScanPath: URL.createObjectURL(ctScanFileInput.files[0]), // Mock path
    };
    addNewPatient(newPatient);
    closeAddPatientPopup();
  };

  addPatientBtn.addEventListener("click", openAddPatientPopup);
  closePopupBtn.addEventListener("click", closeAddPatientPopup);
  addPatientForm.addEventListener("submit", handleAddPatientFormSubmit);

  const viewPatientDetails = (patientId) => {
    alert(`Viewing details for patient ${patientId}`);
  };

  const deletePatient = (patientId) => {
    const patientRow = document.querySelector(`td:contains(${patientId})`).closest("tr");
    patientRow.remove();
  };
});