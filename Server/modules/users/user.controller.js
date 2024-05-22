const userModel = require("./user.model");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { mailer } = require("../../services/mailer");
const { signJWT, generateSixDigitToken } = require("../../utils/token");
const { verify } = require("jsonwebtoken");

const create = (payload) => {
  return userModel.create(payload);
};
const list = async (search, page = 1, limit = 3) => {
  const query = [];
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search.name, "gi"),
      },
    });
  }
  if (search?.role) {
    query.push({
      $match: {
        roles: [search.role],
      },
    });
  }

  query.push({
    $sort: {
      createdAt: 1,
    },
  });

  // pagination

  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        total: 1,
        data: 1,
      },
    },
    {
      $project: {
        "data.password": 0,
      },
    }
  );

  // return userModel.find();
  const result = await userModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const getById = (_id) => {
  return userModel.findOne(_id);
};
const updateById = (_id, payload) => {
  return userModel.updateOne({ _id }, payload);
};

const removeById = (_id) => {
  return userModel.deleteOne({ _id });
};

const register = async (payload) => {
  const { password } = payload;
  if (!password) throw new Error("Password field is missing");
  payload.password = hashPassword(payload.password);

  const user = await userModel.create(payload);
  // return user;
  if (!user) throw new Error("user Registration failed");

  const mail = await mailer(
    user.email,
    "User Registration",
    "User Registeration Completed!!"
  );
  const response = mail
    ? "User Registration Completed"
    : "Something went wrong";
  return response;
  //if (mail) return "User Registration Completed";
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("Email or Password is missing ");
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("User doesn't exist");
  const { password: hashPw } = user;

  const result = comparePassword(password, hashPw);

  if (!result) throw new Error("Email or Password mismatch");

  const userPayload = { name: user.name, email: user.email, roles: user.roles };
  const token = signJWT(userPayload);
  return token;
};

const generateFPToken = async (payload) => {
  const { email } = payload;
  if (!email) throw new Error("Email not found");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User does't exist");

  const token = generateSixDigitToken();
  await userModel.updateOne({ _id: user._id }, { token });

  await mailer(email, "Forget Password Token", `Your reset token is ${token}`);
  return "Token sent to email";
};

const verifyFPToken = async (payload) => {
  const { token, email, password } = payload;
  if (!token || !email || !password) throw new Error("Something is missing");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User doesn't exist");
  if (token !== user.token) throw new Error("invalid Token");

  const updateUser = await userModel.updateOne(
    { email },
    { password: hashPassword(password), token: "" }
  );
  if (!updateUser) throw new Error("Password update failed");
  return "Password changed successfully";
};

const resetPassword = async (payload) => {
  const { userId, password } = payload;
  if (!userId || !password) throw new error("User or Password missing");
  const user = await userModel.findOne({ _id: userId });
  if (!user) throw new Error("User not found");
  await userModel.updateOne(
    { _id: user.id },
    { password: hashPassword(password) }
  );
  return "Password reset successfully";
};

const changePassword = async (payload) => {
  const { oldPassword, newPassword, userId } = payload;
  if (!oldPassword || !newPassword || !userId)
    throw new Error("Somthing is missing");
  const user = await userModel.findOne({ _id: userId }).select("+password");
  if (!user) throw new Error("User not  found");
  const isValidOldPw = comparePassword(oldPassword, user.password);
  if (!isValidOldPw) throw new Error("Password didn't match");
  await userModel.updateOne(
    { _id: user._id },
    { password: hashPassword(newPassword) }
  );
  return "Password Change Successfully";
};

const getProfile = (userId) => {
  return userModel.findOne({ _id: userId });
};
const updateProfile = async (userId, payload) => {
  const user = await userModel.findOne({ _id: userId });
  if (!user) throw new Error("User not found");
  await userModel.updateOne({ _id: user._id }, payload);
  return "Profile updated successfully ";
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  removeById,
  register,
  login,
  generateFPToken,
  verifyFPToken,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
};
