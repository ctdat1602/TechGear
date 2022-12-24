const brandModel = require("./model");

exports.getBrand = async () => {
  return await brandModel.find({}, 'id name');
};