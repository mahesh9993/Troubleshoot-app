export function createJob() {
  let problem = sessionStorage.getItem("problem");
  let device =
    sessionStorage.getItem("brand") + " " + sessionStorage.getItem("model");
  let solution = sessionStorage.getItem("solution");
  let status = "pending";
  let customerId = sessionStorage.getItem("nic");
  let technicianId = "";
  let startDate = getCurrentDate();
  let completeDate = "";

  let record = {
    problem,
    device,
    solution,
    status,
    customerId,
    technicianId,
    startDate,
    completeDate,
  };
  console.log("job details", record);
  let data = { table: "jobs", record };

  window.api.send("create-record", data);

  try {
    window.api.on("create-record-response", (record) => {
      //console.log(record);
      const jobId = record.id;
      //console.log(jobId);
      sessionStorage.setItem("jobId", jobId.toString());
    });
  } catch (error) {
    console.log("error to get id of last record");
  }
}

function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
