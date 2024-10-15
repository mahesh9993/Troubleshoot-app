const inputBrand = document.getElementById("brand");
const inputModel = document.getElementById("model");
const inputYear = document.getElementById("year");

document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("brand")) {
    console.log(sessionStorage.getItem("brand"));
    inputBrand.value = sessionStorage.getItem("brand");
  }
  if (sessionStorage.getItem("model")) {
    console.log(sessionStorage.getItem("model"));
    inputModel.value = sessionStorage.getItem("model");
  }
  if (sessionStorage.getItem("year")) {
    inputYear.value = sessionStorage.getItem("year");
  }
});

function deviceDetailSubmition() {
  //   console.log(inputBrand.value);
  sessionStorage.setItem("brand", inputBrand.value);
  //   console.log(inputModel.value);
  sessionStorage.setItem("model", inputModel.value);
  //   console.log(inputYear.value);
  sessionStorage.setItem("year", inputYear.value);

  rederectTo();
}

function rederectTo() {
  switch (sessionStorage.getItem("problem")) {
    case "Dead Battery":
      window.api.loadHtml(
        "screens/troubleshoot/keypad_phone/solutions/purchase-battery.html"
      );
      break;
    case "Mother Board Issue":
      window.api.loadHtml(
        "screens/troubleshoot/keypad_phone/solutions/board-repair.html"
      );
      break;
    default:
      console.log("not found");
  }
}
