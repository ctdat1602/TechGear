const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: { type: ObjectId },
  email: { type: String, requiredPaths: true },
  password: { type: String, requiredPaths: true },
  name: { type: String, default: "" },
  phone: { type: String, default: "" },
  birthday: { type: String, default: "" },
  address: { type: String, default: "" },
  image: { type: String, default: "" },
  status: { type: Number, default: 0 },
});

module.exports = mongoose.model("user", userSchema);
