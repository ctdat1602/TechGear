const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  price: { type: Number },
  discountPrice: {type: Number},
  quantity: { type: Number },
  firstDate: { type: String },
  insurance: { type: Number },
  descriptions: { type: String },
  image: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: "category" },
  brandId: { type: Schema.Types.ObjectId, ref: "brand" },
  classifyId: { type: Schema.Types.ObjectId, ref: "classify" },
});

module.exports = mongoose.model("product", productSchema);
