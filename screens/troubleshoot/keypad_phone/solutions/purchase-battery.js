import { createJob } from "../../create-job.js";
import { createCustomer } from "../../create-customer.js";

document.addEventListener("DOMContentLoaded", function () {
  // define solution
  sessionStorage.setItem("solution", "Replace Battery");

  let table = "keypad-battery";
  window.api.send("read-records", table);
  window.api.on("read-records-response", (records) => {
    let record = records[0];
    console.log(record);
    let model = record.brand + " " + record.model;
    let price = "RS. " + record.price + "/=";
    console.log(model);
    console.log(price);
    document.getElementById("brand-model").innerHTML = model;
    document.getElementById("price").innerHTML = price;
  });
});

document.getElementById("buyNowBtn").addEventListener("click", function () {
  console.log("click");
  createCustomer();
  createJob();

  setTimeout(() => {
    window.api.loadHtml("screens/troubleshoot/result.html");
  }, 1500);
});
