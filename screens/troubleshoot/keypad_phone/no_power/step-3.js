const batDeadModal = new bootstrap.Modal(
  document.getElementById("bat-dead-modal")
);

const mbIssueModal = new bootstrap.Modal(
  document.getElementById("mb-issue-modal")
);

function onWork() {
  sessionStorage.setItem("problem", "Dead Battery");
  batDeadModal.show();
}

function onNotWork() {
  sessionStorage.setItem("problem", "Mother Board Issue");
  mbIssueModal.show();
}

function hireNow() {
  window.api.loadHtml("screens/troubleshoot/keypad_phone/device-detail.html");
}

function exit() {
  window.api.loadHtml("screens/thank-you.html");
}

function purchaseNow() {
  window.api.loadHtml("screens/troubleshoot/keypad_phone/device-detail.html");
}
