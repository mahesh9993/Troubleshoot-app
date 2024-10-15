const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const keypadBattery = require("./tables/keypad-battery");
const customers = require("./tables/customers");
const jobs = require("./tables/jobs");
const technicians = require("./tables/technicians");
const serviceCharges = require("./tables/service-charge");
const inventory = require("./tables/inventory");

const dbPath = path.join(__dirname, "..", "data", "database.db");
const db = new sqlite3.Database(dbPath);

// Initialize the database
// db.serialize(() => {
//   db.run(usersTable.createTable);
//   db.run(productsTable.createTable);
//   db.run(ordersTable.createTable);
// });

const createRecord = (table, record) => {
  //console.log("db", table, record);
  const query = getTableQuery(table).insert;
  //console.log(query);
  return new Promise((resolve, reject) => {
    db.run(query, Object.values(record), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
};

const readRecords = (table) => {
  const query = getTableQuery(table).selectAll;
  //console.log(query);
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const updateRecord = (table, record) => {
  //console.log(record);
  const query = getTableQuery(table).update;
  return new Promise((resolve, reject) => {
    db.run(query, Object.values(record), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};

const deleteRecord = (table, id) => {
  //console.log("db", "delete", table, id);
  const query = getTableQuery(table).deleteRecord;
  //console.log(query);
  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};

const findById = (table, id) => {
  const query = getTableQuery(table).selectById;
  console.log(query);
  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
//find by one column
const findBy = (table, column, value) => {
  const query = `SELECT * FROM ${table} WHERE ${column} = ?`;
  //console.log(query);
  return new Promise((resolve, reject) => {
    db.get(query, [value], (err, row) => {
      //console.log("db", row);
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//find all by one column
const findAllBy = (table, column, value) => {
  const query = `SELECT * FROM ${table} WHERE ${column} = ?`;
  //console.log(query);
  return new Promise((resolve, reject) => {
    db.all(query, [value], (err, rows) => {
      //console.log("db", rows);
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//find by two columns
const findByTwoColumns = (table, column1, column2, value1, value2) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE ${column1} = ? AND ${column2} = ?`;
    //console.log("findByTwoColumns" + query);
    db.get(query, [value1, value2], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

//find all by two columns
const findAllByTwoColumns = (table, column1, column2, value1, value2) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE ${column1} = ? AND ${column2} = ?`;
    db.all(query, [value1, value2], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//user authentication
const auth = (table, column1, column2, value1, value2) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE ${column1} = ? AND ${column2} = ?`;
    db.get(query, [value1, value2], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const changePassword = (table, record) => {
  //console.log(record);
  const query = `UPDATE ${table} SET password = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, Object.values(record), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};

const getTableQuery = (table) => {
  switch (table) {
    case "keypad-battery":
      return keypadBattery;
    case "customers":
      return customers;
    case "jobs":
      return jobs;
    case "technicians":
      return technicians;
    case "service-charge":
      return serviceCharges;
    case "inventory":
      return inventory;
    default:
      throw new Error("Unknown table");
  }
};

module.exports = {
  createRecord,
  readRecords,
  updateRecord,
  deleteRecord,
  findById,
  findBy,
  findByTwoColumns,
  findAllBy,
  findAllByTwoColumns,
  auth,
  changePassword,
};
