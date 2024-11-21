document.addEventListener("DOMContentLoaded", () => {
  const userDropdownBtn = document.getElementById("user-dropdown-btn");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const logoutLink = document.getElementById("logout-link");
  const dashboardLogoutButton = document.getElementById("logout");

  // Toggle dropdown menu visibility
  userDropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click from propagating to the window
    userDropdownMenu.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  window.addEventListener("click", () => {
    userDropdownMenu.classList.remove("show");
  });

  // Logout functionality for dropdown link
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  // Logout functionality for dashboard logout button
  if (dashboardLogoutButton) {
    dashboardLogoutButton.addEventListener("click", () => {
      // Show confirmation dialog
      const confirmation = confirm("Are you sure you want to log out?");
      if (confirmation) {
        // Clear user data from localStorage
        localStorage.removeItem("user");

        // Redirect to the login page
        window.location.href = "login.html";
      }
    });
  }
});