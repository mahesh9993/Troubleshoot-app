const update = `
  UPDATE inventory SET price = ? WHERE id = ?
`;

module.exports = { update };
