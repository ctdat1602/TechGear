const classifyService = require("./service");

exports.getClassify = async () => {
  try {
    return await classifyService.getClassify();
  } catch (error) {
    return null;
  }
};

exports.getClassifySelected = async () => {
  try {
    return await classifyService.getClassify();
  } catch (error) {
    return null;
  }
};