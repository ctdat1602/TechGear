const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
  id: { type: ObjectId },
  email: { type: String, requiredPaths: true },
  password: { type: String, requiredPaths: true },
});

module.exports = mongoose.model("admin", adminSchema);
