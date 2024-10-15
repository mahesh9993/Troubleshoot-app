const logedTechnician = sessionStorage.getItem("loggedTechnician") || null;

const data1 = {
  table: "jobs",
  column: "technician_id",
  value: logedTechnician,
};

const data2 = {
  table: "jobs",
  column: "status",
  value: "pending",
};

const data3 = {
  table: "jobs",
  column1: "status",
  column2: "technician_id",
  value1: "processing",
  value2: logedTechnician,
};

const data4 = {
  table: "jobs",
  column1: "status",
  column2: "technician_id",
  value1: "completed",
  value2: logedTechnician,
};

document.addEventListener("DOMContentLoaded", async function () {
  await getJobsByTechnician();
  await getProcessingJobsByTechnician();
  await getPendingJobs();
  await getCompletedJobsByTechnician();
});

async function getJobsByTechnician() {
  window.api.send("find-all-by", data1);
  const records = await onceEvent("find-all-by-response");
  document.getElementById("assignedJobs").innerHTML = records.length;
}

async function getPendingJobs() {
  window.api.send("find-all-by", data2);
  const records = await onceEvent("find-all-by-response");
  console.log("pendingJobs", records);
  document.getElementById("pendingJobs").innerHTML = records.length;
}

async function getProcessingJobsByTechnician() {
  //console.log("function works");
  window.api.send("find-all-by-columns", data3);
  const records = await onceEvent("find-all-by-columns-response");
  //console.log("precessingJobsByTech" + records);
  document.getElementById("progressJobs").innerHTML = records.length;
}

async function getCompletedJobsByTechnician() {
  window.api.send("find-all-by-columns", data4);
  const records = await onceEvent("find-all-by-columns-response");
  document.getElementById("completeJobs").innerHTML = records.length;
}

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
