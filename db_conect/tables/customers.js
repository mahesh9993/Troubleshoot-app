const insert = `
  INSERT INTO customers (id,name,mobile) VALUES (?, ? , ? )
`;

const selectAll = `
  SELECT * FROM customers
`;

const update = `
  UPDATE customers SET name = ?, age = ? WHERE id = ?
`;

const deleteRecord = `
  DELETE FROM customers WHERE id = ?
`;

const selectById = `SELECT * FROM customers WHERE id = ?`;

module.exports = { insert, selectAll, update, deleteRecord, selectById };
