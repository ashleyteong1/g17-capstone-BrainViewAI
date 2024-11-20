document.addEventListener("DOMContentLoaded", () => {
  const userDropdownBtn = document.getElementById("user-dropdown-btn");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const logoutLink = document.getElementById("logout-link");


    userDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click from propagating to the window
      userDropdownMenu.classList.toggle("show");
    });
  
    // Close dropdown when clicking outside
    window.addEventListener("click", () => {
      userDropdownMenu.classList.remove("show");
    });
  
    // Logout functionality
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });

  });