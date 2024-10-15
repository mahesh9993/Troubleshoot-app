const showCustomerModal = new bootstrap.Modal(
  document.getElementById("customerModal")
);

const assignTechnician = new bootstrap.Modal(
  document.getElementById("assignTechnician")
);

let jobId;

document.addEventListener("DOMContentLoaded", async function () {
  await getaAllJobs();

  const pendingJobs = await filterJobs("jobs", "status", "pending");
  //console.log(pendingJobs);
  const processingJobs = await filterJobs("jobs", "status", "processing");
  const completedJobs = await filterJobs("jobs", "status", "completed");

  //map pending jobs
  document.getElementById("pendingJobs").innerHTML = pendingJobs
    .map((job) => {
      return `<tr>
         <td>${job.start_date}</td>
         <td>${job.problem}</td>
         <td>${job.device}</td>
         <td>${job.solution}</td>
         <td>${job.status}</td>
         <td style ="cursor: pointer;" onClick="onCustomer(${job.customer_id})" ><i class="bi bi-person me-1"></i>${job.customer_id}</td>
         <td><button type="button" class="btn btn-success" onClick="onAssignBtn(${job.id})">Assign</button></td>
         </tr>`;
    })
    .join("");

  //map processing jobs
  document.getElementById("processingJobs").innerHTML = processingJobs
    .map((job) => {
      return `<tr>
         <td>${job.start_date}</td>
         <td>${job.problem}</td>
         <td>${job.device}</td>
         <td>${job.solution}</td>
         <td>${job.status}</td>
         <td style ="cursor: pointer;" onClick="onCustomer(${job.customer_id})" ><i class="bi bi-person me-1"></i>${job.customer_id}</td>
         <td>${job.technician_id}</td>
         </tr>`;
    })
    .join("");

  //map completed jobs
  document.getElementById("completedJobs").innerHTML = completedJobs
    .map((job) => {
      return `<tr>
         <td>${job.start_date}</td>
         <td>${job.problem}</td>
         <td>${job.device}</td>
         <td>${job.solution}</td>
         <td>${job.status}</td>
         <td style ="cursor: pointer;" onClick="onCustomer(${job.customer_id})" ><i class="bi bi-person me-1"></i>${job.customer_id}</td>
         <td>${job.technician_id}</td>
         <td>${job.complete_date}</td>
         </tr>`;
    })
    .join("");
});

async function getaAllJobs() {
  window.api.send("read-records", "jobs");
  const jobs = await onceEvent("read-records-response");

  const rows = jobs
    .map((job) => {
      return `<tr>
<td>${job.start_date}</td>
<td>${job.problem}</td>
<td>${job.device}</td>
<td>${job.solution}</td>
<td>${job.status}</td>
<td style ="cursor: pointer;" onClick="onCustomer(${job.customer_id})" ><i class="bi bi-person me-1"></i>${job.customer_id}</td>
<td>${job.technician_id}</td>
</tr>`;
    })
    .join("");

  //console.log("Generated Rows:", rows);

  document.getElementById("allJobs").innerHTML = rows;
}

async function filterJobs(table, column, value) {
  let data = { table, column, value };
  window.api.send("find-all-by", data);

  const jobs = await onceEvent("find-all-by-response");
  return jobs;
}

async function onCustomer(id) {
  //console.log(id);
  let data = { table: "customers", id };
  window.api.send("find-by-id", data);

  const customer = await onceEvent("find-by-id-response");
  //console.log(customer);
  if (customer.id) {
    showCustomerDetails(customer);
  } else {
    alert("no customers");
  }
}

function showCustomerDetails(customer) {
  let name = document.getElementById("name");
  let nic = document.getElementById("nic");
  let mobile = document.getElementById("mobile");

  name.value = customer.name;
  nic.value = customer.id;
  mobile.value = customer.mobile;

  showCustomerModal.show();
}

async function onAssignBtn(_id) {
  jobId = _id;
  console.log("jobId :", jobId);
  //console.log("clicked");
  const technicians = await getAllTechnicians();
  //console.log(technicians);

  const options = technicians
    .map((technician) => {
      return `<option value="${technician.id}">${technician.username}</option>`;
    })
    .join("");

  document.getElementById("selctTechnician").innerHTML = options;

  assignTechnician.show();
}

async function getAllTechnicians() {
  window.api.send("read-records", "technicians");
  return await onceEvent("read-records-response");
}

document
  .getElementById("saveChanges")
  .addEventListener("click", async function () {
    const selectedTechnicianId =
      document.getElementById("selctTechnician").value;

    //console.log("selected technician" + selectedTechnicianId);
    const job = await getJobById(jobId);
    if (job) {
      //edit job
      job.technician_id = Number(selectedTechnicianId);
      job.status = "processing";
      //console.log("Job:", job);

      let record = {
        status: job.status,
        technician_id: job.technician_id,
        complete_date: job.complete_date,
        id: job.id,
      };

      //console.log("Record:", record);
      let data = { table: "jobs", record };

      window.api.send("update-record", data);
      const response = await onceEvent("update-record-response");
      //console.log(response);

      alert("Job Sucessfully assigened");
      location.reload();
    } else {
      alert("Job not found");
    }
  });

async function getJobById(id) {
  let data = { table: "jobs", id };
  console.log("data", data);
  window.api.send("find-by-id", data);
  return await onceEvent("find-by-id-response");
}

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
