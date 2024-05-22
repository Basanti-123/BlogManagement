const bcryptjs = require("bcryptjs");

const hashPassword = (password) => {
  return bcryptjs.hashSync(password, Number(process.env.SALT_ROUND));
};

const comparePassword = (password, hashPassword) => {
  return bcryptjs.compareSync(password, hashPassword);
};

module.exports = { hashPassword, comparePassword };
