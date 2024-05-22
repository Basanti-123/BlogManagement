const userModel = require("../modules/users/user.model");
const { verifyJWT } = require("./token");

const checkRole = (sysRole) => {
  return async (req, res, next) => {
    try {
    const { access_token } = req.headers || "";
    if (!access_token) throw new Error("Access Token is required");

    const tokenData = verifyJWT(access_token);
    if (!tokenData) throw new Error ("Token Expired");
    const { data } = tokenData;
    const isValidRole = sysRole.some((role) => data.roles.includes(role));
    if (!isValidRole) throw new Error("Permission Denied");
    const {email } = data;
    const user = await userModel.findOne({ email });
   req.currentUser = user?._id;
   req.roles = user?.roles
    next();
  } catch (e) {
    next (e);
  }
};
};
module.exports = { checkRole };
