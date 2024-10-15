const inputCname = document.getElementById("customerName");
const inputMnumber = document.getElementById("mobileNumber");
const inputdevice = document.getElementById("device");
const inputProblem = document.getElementById("problem");
const inputJobId = document.getElementById("jobId");
const device =
  sessionStorage.getItem("brand") + " " + sessionStorage.getItem("model");
const customerId = sessionStorage.getItem("nic");
const solution = sessionStorage.getItem("solution");

document.addEventListener("DOMContentLoaded", function () {
  alert(solution + " sucessful");

  inputCname.value = sessionStorage.getItem("username");
  inputMnumber.value = sessionStorage.getItem("mobileNumber");
  inputdevice.value = device;
  inputProblem.value = sessionStorage.getItem("problem");
  inputJobId.value = sessionStorage.getItem("jobId");
});

window.onafterprint = function () {
  //alert("after print");
  window.api.loadHtml("screens/thank-you.html");
};
