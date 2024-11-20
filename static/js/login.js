document.addEventListener("DOMContentLoaded", () => {
    // Password toggle logic (reused from earlier)
    const passwordFields = document.querySelectorAll(".password-container input");
    const toggleButtons = document.querySelectorAll(".toggle-password");
  
    toggleButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const passwordField = passwordFields[index];
        const isPasswordVisible = passwordField.type === "password";
        passwordField.type = isPasswordVisible ? "text" : "password";
        button.textContent = isPasswordVisible ? "🙈" : "👁️";
      });
    });
  
    // Login form submission logic
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent actual form submission
  
      const userId = document.getElementById("user-id").value.trim();
      const password = document.getElementById("password").value.trim();
  
      // Mock validation (replace this with real authentication)
      if (userId === "doctor123" && password === "password123") {
        // Store user session (mock session)
        localStorage.setItem("user", JSON.stringify({ userId, name: "Dr. Jhone Smith" }));
  
        // Redirect to main page
        window.location.href = "main.html";
      } else {
        alert("Invalid User ID or Password. Please try again.");
      }
    });
  
    // Dropdown menu toggle logic for main.html
    const dropdownButton = document.getElementById("user-dropdown-btn");
    const dropdownMenu = document.getElementById("user-dropdown-menu");
  
    dropdownButton?.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });
  });