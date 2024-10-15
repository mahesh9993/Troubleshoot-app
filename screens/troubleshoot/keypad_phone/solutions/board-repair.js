import { createJob } from "../../create-job.js";
import { createCustomer } from "../../create-customer.js";

document.addEventListener("DOMContentLoaded", function () {
  sessionStorage.setItem("solution", "Hire technician");
  let data = {
    table: "service_charge",
    column1: "service",
    column2: "device_type",
    value1: "Board Repair",
    value2: "keypad phone",
  };
  window.api.send("find-by-columns", data);
  window.api.on("find-by-columns-response", (response) => {
    console.log(response);
    let charge = response.charge;
    document.getElementById(
      "totalCharge"
    ).innerHTML = `${charge} <small class="text-muted">/ LKR</small>`;
  });
});

document.getElementById("proceedBtn").addEventListener("click", function () {
  createCustomer();
  createJob();

  setTimeout(() => {
    window.api.loadHtml("screens/troubleshoot/result.html");
  }, 1500);
});
