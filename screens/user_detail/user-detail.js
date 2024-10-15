const fillAllAlert = new bootstrap.Modal(document.getElementById("alert"));

document.addEventListener("DOMContentLoaded", (event) => {
  // Get the form element
  const form = document.querySelector("form.needs-validation");

  // Add event listener for form submission
  form.addEventListener(
    "submit",
    function (event) {
      // Prevent default form submission
      event.preventDefault();
      event.stopPropagation();

      // Get input values
      const username = document.getElementById("yourUsername").value;
      if (username != "STAFF") {
        const nic = document.getElementById("yourNIC").value;
        const mobileNumber = document.getElementById("yourMobileNumber").value;

        // Validate input fields
        if (username && nic && mobileNumber) {
          // Store values in session storage
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("nic", nic);
          sessionStorage.setItem("mobileNumber", mobileNumber);

          // Redirect to select device page
          window.api.loadHtml("screens/troubleshoot/select-device.html");
        } else {
          // Handle validation failure
          fillAllAlert.show();
        }

        // Add Bootstrap validation classes
        form.classList.add("was-validated");
      } else {
        window.api.loadHtml("screens/login/login.html");
      }
    },
    false
  );
});
