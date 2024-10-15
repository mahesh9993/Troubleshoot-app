// const createTable = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     age INTEGER
//   )
// `;

const insert = `
  INSERT INTO jobs (problem,device, solution,status,customer_id,technician_id,start_date,complete_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const selectAll = `
  SELECT * FROM jobs
`;

const update = `
  UPDATE jobs SET status = ?, technician_id = ?, complete_date =? WHERE id = ?
`;

const deleteRecord = `
  DELETE FROM jobs WHERE id = ?
`;

const selectById = `SELECT * FROM jobs WHERE id = ?`;

module.exports = { insert, selectAll, update, deleteRecord, selectById };
