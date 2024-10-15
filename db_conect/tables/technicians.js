const selectAll = `
  SELECT * FROM technicians
`;

const insert = `INSERT INTO technicians (username,password,nic,mobile,status) VALUES (?, ?, ?, ?,?)`;

const deleteRecord = `
  DELETE FROM technicians WHERE id = ?
`;

const update = `UPDATE technicians SET status = ? WHERE id = ?
  
`;

const selectById = `SELECT * FROM technicians WHERE id = ?`;

module.exports = { selectAll, insert, deleteRecord, update, selectById };
