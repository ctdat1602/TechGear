const categoryService = require("./service");

exports.getCategory = async () => {
  try {
    return await categoryService.getCategory();
  } catch (error) {
    return null;
  }
};

exports.getCategoriesSelected = async () => {
  try {
    return await categoryService.getCategory();
  } catch (error) {
    return null;
  }
};
