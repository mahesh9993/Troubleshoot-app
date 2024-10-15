const editServiceChargeModal = new bootstrap.Modal(
  document.getElementById("editServiceCharge")
);

const serviceForm = document.getElementById("serviceForm");
const saveNewChargeBtn = document.getElementById("saveChanges");
let serviceId;

document.addEventListener("DOMContentLoaded", async function () {
  await getAllServiceCharges();
});

async function getAllServiceCharges() {
  window.api.send("read-records", "service-charge");
  const services = await onceEvent("read-records-response");
  //console.log(services);

  const rows = services
    .map((service) => {
      return `<tr>
      <td>${service.id}</td>
      <td>${service.service}</td>
      <td>${service.device_type}</td>
      <td>${service.charge}</td>
      <td>
        <button class="btn btn-primary" onClick="onEditBtn(${service.id})">Edit</button>
      </td>
    </tr>`;
    })
    .join("");

  //console.log("Generated Rows:", rows);

  document.getElementById("serviceChargeTable").innerHTML = rows;
}

function onEditBtn(id) {
  //console.log(id);
  serviceId = id;
  //console.log(serviceId);
  editServiceChargeModal.show();
  //console.log(deleteId);
}

saveNewChargeBtn.addEventListener("click", async function () {
  const inputCharge = document.getElementById("inputCharge").value;
  //console.log(inputCharge);
  let record = { charge: inputCharge, id: serviceId };
  let data = { table: "service-charge", record };

  window.api.send("update-record", data);

  const response = await onceEvent("update-record-response");
  console.log(response);

  if (response.changes) {
    alert("Charges Successfully Updated");
    location.reload();
  } else {
    alert("Service Not Found");
  }
});

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
