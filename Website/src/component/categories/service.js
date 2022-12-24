const categoryModel = require("./model");

exports.getCategory = async () => {
  return await categoryModel.find({}, 'id name');
};