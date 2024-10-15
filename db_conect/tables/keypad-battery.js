// const createTable = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     age INTEGER
//   )
// `;

const insert = `
  INSERT INTO keypad_battery (name, age) VALUES (?, ?)
`;

const selectAll = `
  SELECT * FROM keypad_battery
`;

const update = `
  UPDATE keypad_battery SET name = ?, age = ? WHERE id = ?
`;

const deleteRecord = `
  DELETE FROM keypad_battery WHERE id = ?
`;

const selectById = `SELECT * FROM keypad_battery WHERE id = ?`;

module.exports = { insert, selectAll, update, deleteRecord, selectById };
