const brandService = require("./service");

exports.getBrand = async () => {
  try {
    return await brandService.getBrand();
  } catch (error) {
    return null;
  }
};

exports.getBrandSelected = async () => {
  try {
    return await brandService.getBrand();
  } catch (error) {
    return null;
  }
};
