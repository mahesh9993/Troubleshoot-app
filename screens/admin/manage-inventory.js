const editItemModal = new bootstrap.Modal(document.getElementById("editItem"));

const newItemList = document.getElementById("newItemList");
const usedItemList = document.getElementById("usedItemList");
const saveNewChargeBtn = document.getElementById("saveChanges");

let itemId;

document.addEventListener("DOMContentLoaded", async function () {
  const newItems = await filterInventory("inventory", "condition", "new");
  const usedItems = await filterInventory("inventory", "condition", "used");

  newItemList.innerHTML = newItems
    .map((item) => {
      return `<tr>
        <td>${item.detail}</td>
        <td>${item.brand}</td>
        <td>${item.device_type}</td>
        <td>${item.year}</td>
        <td>${item.capacity}</td>
        <td>${item.warranty}</td>
        <td>${item.price}</td>
        <td><button type="button" class="btn btn-primary" onClick="onEditBtn(${item.id})">Edit</button></td>
        </tr>`;
    })
    .join("");

  usedItemList.innerHTML = usedItems
    .map((item) => {
      return `<tr>
        <td>${item.detail}</td>
        <td>${item.brand}</td>
        <td>${item.device_type}</td>
        <td>${item.year}</td>
        <td>${item.capacity}</td>
        <td>${item.warranty}</td>
        <td>${item.price}</td>
        <td><button type="button" class="btn btn-primary" onClick="onEditBtn(${item.id})">Edit</button></td>
        </tr>`;
    })
    .join("");
});

async function filterInventory(table, column, value) {
  let data = { table, column, value };
  window.api.send("find-all-by", data);

  const items = await onceEvent("find-all-by-response");
  return items;
}

function onEditBtn(id) {
  itemId = id;
  editItemModal.show();
}

saveNewChargeBtn.addEventListener("click", async function () {
  const inputCharge = document.getElementById("inputCharge").value;
  console.log(inputCharge);
  let record = { price: inputCharge, id: itemId };
  let data = { table: "inventory", record };
  console.log(data);

  window.api.send("update-record", data);

  const response = await onceEvent("update-record-response");
  console.log(response);

  if (response.changes) {
    alert("Item Successfully Updated");
    location.reload();
  } else {
    alert("Item Not Found");
  }
});

function onceEvent(event) {
  return new Promise((resolve) => {
    window.api.once(event, (response) => resolve(response));
  });
}
