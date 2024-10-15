const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const fs = require("fs");
const db = require("./db_conect/db");

let win;

function createMainWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  //win.setMenuBarVisibility(false);
}

app.on("ready", createMainWindow);

// app.whenReady().then(() => {
//   createMainWindow();

//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createMainWindow();
//     }
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// Listen for 'load-html' event from renderer process
ipcMain.on("load-html", (event, arg) => {
  if (win) {
    win.loadFile(arg);
  }
});

// IPC Handlers for CRUD operations for different tables
ipcMain.on("create-record", async (event, { table, record }) => {
  //console.log("main", table, record);
  try {
    const result = await db.createRecord(table, record);
    event.reply("create-record-response", result);
    //console.log("create-record-result" + result);
  } catch (error) {
    event.reply("create-record-response", { error: error.message });
  }
});

ipcMain.on("read-records", async (event, table) => {
  try {
    //console.log(table);
    const result = await db.readRecords(table);
    event.reply("read-records-response", result);
    //console.log("main" + result);
  } catch (error) {
    event.reply("read-records-response", { error: error.message });
  }
});

ipcMain.on("update-record", async (event, { table, record }) => {
  //console.log("update record" + table);
  try {
    const result = await db.updateRecord(table, record);
    event.reply("update-record-response", result);
  } catch (error) {
    event.reply("update-record-response", { error: error.message });
  }
});

ipcMain.on("delete-record", async (event, { table, id }) => {
  //console.log("main", "delete", table, id);
  try {
    const result = await db.deleteRecord(table, id);
    event.reply("delete-record-response", result);
  } catch (error) {
    event.reply("delete-record-response", { error: error.message });
  }
});

ipcMain.on("find-by-id", async (event, { table, id }) => {
  console.log("main", table, id);
  try {
    const result = await db.findById(table, id);
    event.reply("find-by-id-response", result);
  } catch (error) {
    event.reply("find-by-id-response", { error: error.message });
  }
});

ipcMain.on("find-by", async (event, { table, column, value }) => {
  try {
    const result = await db.findBy(table, column, value);
    console.log("main", result);
    event.reply("find-by-response", result);
  } catch (error) {
    event.reply("find-by-response", { error: error.message });
  }
});

ipcMain.on("find-all-by", async (event, { table, column, value }) => {
  try {
    const result = await db.findAllBy(table, column, value);
    console.log("main", result);
    event.reply("find-all-by-response", result);
  } catch (error) {
    event.reply("find-all-by-response", { error: error.message });
  }
});

ipcMain.on(
  "find-by-columns",
  async (event, { table, column1, column2, value1, value2 }) => {
    try {
      const result = await db.findByTwoColumns(
        table,
        column1,
        column2,
        value1,
        value2
      );
      //console.log("main", result);
      event.reply("find-by-columns-response", result);
    } catch (error) {
      event.reply("find-by-columns-response", { error: error.message });
    }
  }
);

ipcMain.on("find-all-by", async (event, { table, column, value }) => {
  try {
    const result = await db.findAllBy(table, column, value);
    console.log("main", result);
    event.reply("find-all-by-response", result);
  } catch (error) {
    event.reply("find-all-by-response", { error: error.message });
  }
});

ipcMain.on("find-all-by", async (event, { table, column, value }) => {
  try {
    const result = await db.findAllBy(table, column, value);
    console.log("main", result);
    event.reply("find-all-by-response", result);
  } catch (error) {
    event.reply("find-all-by-response", { error: error.message });
  }
});

ipcMain.on(
  "find-all-by-columns",
  async (event, { table, column1, column2, value1, value2 }) => {
    try {
      const result = await db.findAllByTwoColumns(
        table,
        column1,
        column2,
        value1,
        value2
      );
      //console.log("main", result);
      event.reply("find-all-by-columns-response", result);
    } catch (error) {
      event.reply("find-all-by-columns-response", { error: error.message });
    }
  }
);

ipcMain.on(
  "user-auth",
  async (event, { table, column1, column2, value1, value2 }) => {
    //console.log(table, column1, column2, value1, value2);
    try {
      const result = await db.auth(table, column1, column2, value1, value2);
      //console.log("main", result);
      event.reply("user-auth-response", result);
    } catch (error) {
      event.reply("user-auth-response", { error: error.message });
    }
  }
);

ipcMain.on("update-password", async (event, { table, record }) => {
  try {
    const result = await db.changePassword(table, record);
    event.reply("update-password-response", result);
  } catch (error) {
    event.reply("update-password-response", { error: error.message });
  }
});
