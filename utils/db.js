const mongoose = require("mongoose");

const { Types } = mongoose.Schema;

async function main() {
  // console.log("trying to connect: " + process.env.DB_STRING);
  await mongoose.connect(process.env.DB_STRING);
}

const userSchema = new mongoose.Schema({
  name: { type: Types.String, required: true },
  email: { type: Types.String, required: true },
  password: { type: Types.String, required: true },
  categories: { type: Types.ObjectId, ref: "Category" },
  token: { type: Types.String },
});

const User = mongoose.model("User", userSchema);

const catSchema = new mongoose.Schema({
  categories: [Object],
});

const Category = mongoose.model("Category", catSchema);

db = { connect: main, User, Category };

module.exports = db;
