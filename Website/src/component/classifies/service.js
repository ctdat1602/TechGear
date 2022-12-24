const classifyModel = require("./model");

exports.getClassify = async () => {
  return await classifyModel.find({}, 'id name');
};