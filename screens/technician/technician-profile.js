const loggedtechnician = sessionStorage.getItem("loggedTechnician");

const pwDifferAlert = new bootstrap.Modal(
  document.getElementById("pwDifferAlert")
);

const pwverificationAlert = new bootstrap.Modal(
  document.getElementById("pwveriMsg")
);

const successAlert = new bootstrap.Modal(
  document.getElementById("successAlert")
);

const currntPasswrdNtMatch = new bootstrap.Modal(
  document.getElementById("currntPasswrdNtMatch")
);

document.addEventListener("DOMContentLoaded", async function () {
  const technician = await getLoggedTechnician();
  //console.log(technician);

  document.getElementById("title-technician").innerHTML = technician.username;

  document.getElementById("profile-overview").innerHTML = `
     <h5 class="card-title">Profile Details</h5>
   <div class="row">
       <div class="col-lg-3 col-md-4 label">Name</div>
       <div class="col-lg-9 col-md-8">${technician.username}</div>
     </div>
     <div class="row">
       <div class="col-lg-3 col-md-4 label">NIC</div>
       <div class="col-lg-9 col-md-8">
         ${technician.nic}
       </div>
     </div>
     <div class="row">
     <div class="col-lg-3 col-md-4 label">Mobile Number</div>
       <div class="col-lg-9 col-md-8">${technician.mobile}</div>
     </div>`;
});

document
  .getElementById("changeStatusForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const selectedRadio = document.querySelector(
      'input[name="option"]:checked'
    );

    const selectedValue = selectedRadio ? selectedRadio.value : null;
    //console.log(selectedValue);

    if (selectedValue) {
      const updateStatusResponse = await updateStatus(selectedValue);
      if (updateStatusResponse) {
        successAlert.show();
      } else {
        alert("server error: status not updated");
      }
    } else {
      alert("update status failed");
    }
  });

async function updateStatus(status) {
  let record = { status: status, id: loggedtechnician };
  console.log(record);
  let data = { table: "technicians", record };

  window.api.send("update-record", data);

  return await onceEvent("update-record-response");
}

document
  .getElementById("changePassword")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const renewPassword = document.getElementById("renewPassword").value;
    console.log(currentPassword);
    console.log(newPassword);
    console.log(renewPassword);
    if (newPassword == renewPassword) {
      changePassword(currentPassword, newPassword);
    } else {
      pwDifferAlert.show();
    }
  });

async function changePassword(currentPassword, newPassword) {
  const verification = await verifyCurrentPassword(currentPassword);
  //console.log(verification);
  if (verification) {
    let record = { password: newPassword, id: Number(loggedtechnician) };
    let data = { table: "technicians", record };

    window.api.send("update-password", data);

    const passwordChangeResponse = await onceEvent("update-password-response");
    if (passwordChangeResponse) {
      successAlert.show();
    } else {
      pwverificationAlert.show();
    }
  } else {
    currntPasswrdNtMatch.show();
  }
}

async function verifyCurrentPassword(currentPassword) {
  const technician = await getLoggedTechnician();
  if (technician) {
    if (technician.password == currentPassword) {
      return true;
    } else {
      return false;
    }
  } else {
    pwverificationAlert.show();
  }
}

async function getLoggedTechnician() {
  let data = { table: "technicians", id: Number(loggedtechnician) };
  //console.log(data);
  window.api.send("find-by-id", data);

  return await onceEvent("find-by-id-response");
}

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
