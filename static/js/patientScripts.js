document.addEventListener("DOMContentLoaded", () => {
    const addPatientBtn = document.getElementById("add-patient-btn");
    const searchBar = document.getElementById("search-bar");
    const patientList = document.getElementById("patient-list");
  
    // Event to add new patient (for demonstration purposes)
    addPatientBtn.addEventListener("click", () => {
      const newRow = `
        <tr>
          <td>PT003</td>
          <td>New Patient</td>
          <td>50</td>
          <td>New Condition</td>
          <td>${new Date().toISOString().split("T")[0]}</td>
          <td>
            <button class="btn-secondary">View</button>
            <button class="btn-danger">Delete</button>
          </td>
        </tr>
      `;
      patientList.innerHTML += newRow;
    });
  
    // Search functionality
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
  });