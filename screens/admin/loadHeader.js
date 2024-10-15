function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => {
      console.error("Error fetching the HTML file:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "header.html");
});
