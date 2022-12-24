const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let ModelSchema = new Schema({
    id: { type: ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    quantity: { type: Number },
    total: { type: Number },
    createdAt: {type: Date, default: Date.now},
    status: {type: Number, default: 1}
},);


module.exports = mongoose.model('order', ModelSchema);