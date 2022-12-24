const newspaperModel = require("./model");

exports.getNewspaper = async () => {
  return await newspaperModel.find().select("image name date");
};

exports.getNewspaperID = async (id) => {
  const newspaper = await newspaperModel.findById(id);
  return newspaper;
};

exports.insert = async (newspaper) => {
  const product = new newspaperModel(newspaper);
  console.log(">>>>>>>>>", product);
  await product.save();
};

exports.update = async (id, newspaper) => {
  await newspaperModel.findByIdAndUpdate(id, newspaper);
};
