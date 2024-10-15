const createTechModal = new bootstrap.Modal(
  document.getElementById("createTechnician")
);

const confirmDeleteTechnician = new bootstrap.Modal(
  document.getElementById("confirmDelete")
);

let deleteId;

const techForm = document.getElementById("createTechForm");

document.addEventListener("DOMContentLoaded", async function () {
  await getAllTechnicians();
  await getAllActiveTechnicians();
});

async function getAllTechnicians() {
  window.api.send("read-records", "technicians");
  const technicians = await onceEvent("read-records-response");
  //console.log(technicians);

  const rows = technicians
    .map((technician) => {
      return `<tr>
    <td>${technician.username}</td>
    <td>${technician.nic}</td>
    <td>${technician.mobile}</td>
    <td>${technician.status}</td>
    <td>
      <button class="btn btn-danger" onClick="onDeleteBtn(${technician.id})">Delete</button>
    </td>
  </tr>`;
    })
    .join("");

  //console.log("Generated Rows:", rows);

  document.getElementById("techniciansTable").innerHTML = rows;
}

async function getAllActiveTechnicians() {
  let data = { table: "technicians", column: "status", value: "Active" };
  window.api.send("find-all-by", data);

  const technicians = await onceEvent("find-all-by-response");

  const rows = technicians
    .map((technician) => {
      return `<tr>
  <td>${technician.username}</td>
  <td>${technician.nic}</td>
  <td>${technician.mobile}</td>
  <td>${technician.status}</td>
  <td>
    <button class="btn btn-danger" onClick="onDeleteBtn(${technician.id})">Delete</button>
  </td>
</tr>`;
    })
    .join("");

  //console.log("Generated Rows:", rows);

  document.getElementById("activeTechnicians").innerHTML = rows;
}

function onCreateBtn() {
  createTechModal.show();
}

techForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nic = document.getElementById("nic").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const mobile = document.getElementById("mobile").value;
  const status = "Active";

  // console.log(nic);
  // console.log(username);
  // console.log(password);
  // console.log(mobile);

  let record = { username, password, nic, mobile, status };
  let data = { table: "technicians", record };

  window.api.send("create-record", data);
  const response = await onceEvent("create-record-response");
  console.log(response);
  location.reload();
});

async function onDeleteBtn(id) {
  deleteId = id;
  confirmDeleteTechnician.show();
}

async function OnDeleteConfirm() {
  let id = deleteId;
  let data = { table: "technicians", id };
  window.api.send("delete-record", data);

  const response = await onceEvent("delete-record-response");
  console.log(response);
  location.reload();
}

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
