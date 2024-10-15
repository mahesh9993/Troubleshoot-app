const selectAll = `
  SELECT * FROM service_charge
`;

const insert = `
  INSERT INTO service_charge (service,device_type,charge) VALUES (?, ? , ? )
`;

const update = `
  UPDATE service_charge SET charge = ? WHERE id = ?
`;

const deleteRecord = `
  DELETE FROM service_charge WHERE id = ?
`;

module.exports = { selectAll, insert, update, deleteRecord };
