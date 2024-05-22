const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const blogSchema = new Schema(
  {
    title: { type: String, require: [true, "Title is missing"] },
    slug: { type: String, required: true, unique: true },
    tags: [String],
    image:{type: String},
    content: { type: String },
    author: { type: ObjectId, ref: "User", required: true },
    words: { type: Number, default: 0 },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    publishedDate:{type:Date , default:Date.now},
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = new model("Blog", blogSchema);
