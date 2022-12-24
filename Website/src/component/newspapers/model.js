const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const newspaperSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  date: { type: String },
  image: { type: String },
  descriptions: { type: String },
});

module.exports = mongoose.model("newspaper", newspaperSchema);
