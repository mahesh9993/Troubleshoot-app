const batDeadModal = new bootstrap.Modal(
  document.getElementById("bat-dead-modal")
);
const retry = new bootstrap.Modal(
  document.getElementById("check-after-high-charge")
);
const askResult = new bootstrap.Modal(document.getElementById("ask-result"));

const batDrainModal = new bootstrap.Modal(
  document.getElementById("bat-drain-modal")
);
// document.addEventListener("DOMContentLoaded", () => {
//   const inputElement = document.getElementById("inputVoltage");
//   inputElement.focus();

//   document.getElementById("formSubmit").addEventListener("click", (event) => {
//     event.preventDefault();
//     checkVoltage();
//   });
// });

function checkVoltage() {
  //console.log("click");
  let input = document.getElementById("inputVoltage");
  let voltage = input.value;
  //console.log(voltage);
  // check the input field empty or not
  if (voltage) {
    // check the voltage
    if (voltage < 3.5) {
      // voltage less than 3.5 in second time
      if (sessionStorage.getItem("first-check")) {
        console.log("solution 1.1");
        sessionStorage.setItem("problem", "Dead Battery");
        batDeadModal.show();
      } else {
        //less than 3.5 for first time
        sessionStorage.setItem("first-check", "yes");
        batDrainModal.show();
        input.focus();
      }
    } else {
      if (sessionStorage.getItem("first-check")) {
        //greater than 3.5 in second time
        retry.show();
      } else {
        //greater than 3.5 in first time
        window.api.loadHtml(
          "screens/troubleshoot/keypad_phone/no_power/step-3.html"
        );
      }
    }
  }
}

//handle dead battery model
function exit() {
  window.api.loadHtml("screens/thank-you.html");
}

function purchaseNow() {
  window.api.loadHtml("screens/troubleshoot/keypad_phone/device-detail.html");
}

//handle retry modal
document.getElementById("retryOkBtn").addEventListener("click", function () {
  setTimeout(() => {
    askResult.show();
  }, 2000);
});

//handle ask modal
document.getElementById("yesBtn").addEventListener("click", function () {
  exit();
});

document.getElementById("noBtn").addEventListener("click", function () {
  window.api.loadHtml("screens/troubleshoot/keypad_phone/no_power/step-3.html");
});
