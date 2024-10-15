const logedTechnician = sessionStorage.getItem("loggedTechnician") || null;
let jobId;

const showCustomerModal = new bootstrap.Modal(
  document.getElementById("customerModal")
);

const jobAcceptModal = new bootstrap.Modal(
  document.getElementById("acceptJobs")
);

const jobCompleteModal = new bootstrap.Modal(
  document.getElementById("completeJobs")
);

document.addEventListener("DOMContentLoaded", async function () {
  const assignedJobs = await getJobsByTechnician(
    "jobs",
    "technician_id",
    logedTechnician
  );
  //console.log(assignedJobs);
  const processingJobs = await getProcessingJobsByTechnician(
    "jobs",
    "status",
    "technician_id",
    "processing",
    logedTechnician
  );
  const pendingJobs = await getPendingJobs("jobs", "status", "pending");
  const completedJobs = await getCompletedJobsByTechnician(
    "jobs",
    "status",
    "technician_id",
    "completed",
    logedTechnician
  );

  //map assigned jobs
  document.getElementById("allJobs").innerHTML = assignedJobs
    .map((job) => {
      return `<tr>
         <td>${job.start_date}</td>
         <td>${job.problem}</td>
         <td>${job.device}</td>
         <td>${job.solution}</td>
         <td>${job.status}</td>
         <td style ="cursor: pointer;" onClick="onCustomer(${job.customer_id})" ><i class="bi bi-person me-1"></i>${job.customer_id}</td>
         </tr>`;
    })
    .join("");

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
         <td><button type="button" class="btn btn-success" onClick="onAccept(${job.id})">Accept</button></td>
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
       <td><button type="button" class="btn btn-success" onClick="onComplete(${job.id})">Mark as completed</button></td>
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
       <td>${job.complete_date}</td>
       </tr>`;
    })
    .join("");
});

async function getJobsByTechnician(table, column, value) {
  let data = { table, column, value };
  window.api.send("find-all-by", data);
  const records = await onceEvent("find-all-by-response");
  //console.log(records);
  return records;
}

async function getPendingJobs(table, column, value) {
  let data = { table, column, value };
  window.api.send("find-all-by", data);
  const records = await onceEvent("find-all-by-response");
  //console.log(records);
  return records;
}

async function getProcessingJobsByTechnician(
  table,
  column1,
  column2,
  value1,
  value2
) {
  let data = { table, column1, column2, value1, value2 };
  window.api.send("find-all-by-columns", data);
  const records = await onceEvent("find-all-by-columns-response");
  //console.log(records);
  return records;
}

async function getCompletedJobsByTechnician(
  table,
  column1,
  column2,
  value1,
  value2
) {
  let data = { table, column1, column2, value1, value2 };
  window.api.send("find-all-by-columns", data);
  const records = await onceEvent("find-all-by-columns-response");
  //console.log(records);
  return records;
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

function onAccept(id) {
  jobId = id;
  jobAcceptModal.show();
}

async function OnAcceptConfirm() {
  let job = await getJobById(jobId);
  //console.log(job);
  if (job) {
    //edit job
    job.technician_id = logedTechnician;
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

    if (response) {
      alert("Job Sucessfully assigened");
      location.reload();
    } else {
      alert("Job acceptation failed");
    }
  } else {
    alert("Job not found");
  }
}

function onComplete(id) {
  jobId = id;
  jobCompleteModal.show();
}

async function OnCompleteConfirm() {
  let job = await getJobById(jobId);
  //console.log(job);
  if (job) {
    //edit job
    job.status = "completed";
    job.complete_date = getCurrentDate();
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

    if (response) {
      alert("Job marked as complete");
      location.reload();
    } else {
      alert("Oparetion Failed");
    }
  } else {
    alert("Job not found");
  }
}

async function getJobById(id) {
  let data = { table: "jobs", id };
  console.log("data", data);
  window.api.send("find-by-id", data);
  return await onceEvent("find-by-id-response");
}

function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
