//const { required } = require("joi");
const { required } = require("joi");
const { Schema, model } = require("mongoose");
//const { create } = require("./user.controller");

const usrSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: String,
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    token: String,
    profilePic: {type:String},
  },
  { timestamps: true }
);

module.exports = new model("User", usrSchema);
