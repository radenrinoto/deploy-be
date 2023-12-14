const bcrypt = require("bcrypt");

const PasswordHashing = async (password) => {
  return await bcrypt.hash(password, 10);
};

const PasswordCompare = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

module.exports = { PasswordHashing, PasswordCompare };
