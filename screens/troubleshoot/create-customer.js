export function createCustomer() {
  console.log("called");
  let id = sessionStorage.getItem("nic");
  let name = sessionStorage.getItem("username");
  let mobile = sessionStorage.getItem("mobileNumber");

  let record = { id, name, mobile };
  let data = { table: "customers", record };

  window.api.send("create-record", data);
}
