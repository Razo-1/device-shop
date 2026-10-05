const { verifyAccessToken } = require("../verifyAccess/verifyAccess");
const authStack = [ verifyAccessToken ];

module.exports = { authStack }