let data1 = { table: "jobs", column: "status", value: "pending" };
let data2 = { table: "jobs", column: "status", value: "processing" };
let data3 = { table: "jobs", column: "status", value: "completed" };

document.addEventListener("DOMContentLoaded", async function () {
  await getTechnicians();
  await getPendingJobs();
  await getProgressJobs();
  await getCompleteJobs();
});

async function getTechnicians() {
  window.api.send("read-records", "technicians");
  const records = await onceEvent("read-records-response");
  document.getElementById("noOfTechnicians").innerHTML = records.length;
}

async function getPendingJobs() {
  window.api.send("find-all-by", data1);
  const records = await onceEvent("find-all-by-response");
  document.getElementById("pendingJobs").innerHTML = records.length;
}

async function getProgressJobs() {
  window.api.send("find-all-by", data2);
  const records = await onceEvent("find-all-by-response");
  document.getElementById("progressJobs").innerHTML = records.length;
}

async function getCompleteJobs() {
  window.api.send("find-all-by", data3);
  const records = await onceEvent("find-all-by-response");
  document.getElementById("completeJobs").innerHTML = records.length;
}

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
