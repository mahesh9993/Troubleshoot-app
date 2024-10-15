const loginFailAlert = new bootstrap.Modal(
  document.getElementById("loginFailAlert")
);

const admin = {
  username,
  password,
};

const technician = {
  username,
  password,
};

document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const inputUsername = document.getElementById("username").value;
      const inputPassword = document.getElementById("password").value;

      console.log("Username: " + inputUsername);
      console.log("Password: " + inputPassword);

      if (inputUsername == "ADMIN") {
        let data = {
          table: "admin",
          column1: "username",
          column2: "password",
          value1: inputUsername,
          value2: inputPassword,
        };

        window.api.send("user-auth", data);

        const aUser = await onceEvent("user-auth-response");
        //console.log("admin details" + aUser);

        if (aUser) {
          admin.username = aUser.username;
          admin.password = aUser.password;
        }

        if (
          inputUsername == admin.username &&
          inputPassword == admin.password
        ) {
          window.api.loadHtml("screens/admin/dashboard.html");
        } else {
          loginFailAlert.show();
        }
      } else {
        let data = {
          table: "technicians",
          column1: "username",
          column2: "password",
          value1: inputUsername,
          value2: inputPassword,
        };

        window.api.send("user-auth", data);

        const tUser = await onceEvent("user-auth-response");

        //console.log("technician user" + tUser);

        if (tUser) {
          technician.username = tUser.username;
          technician.password = tUser.password;
        }
        if (
          inputUsername == technician.username &&
          inputPassword == technician.password
        ) {
          sessionStorage.setItem("loggedTechnician", tUser.id);
          window.api.loadHtml("screens/technician/technician-dashboard.html");
        } else {
          loginFailAlert.show();
        }
      }
    });
});

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
