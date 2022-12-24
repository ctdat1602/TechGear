const productService = require("../products/service");

exports.getProduct = async () => {
  try {
    return await productService.getProduct();
  } catch (error) {
    return null;
  }
};

exports.getProductById = async (id) => {
  try {
    return await productService.getProductById(id);
  } catch (error) {
    return null;
  }
};

exports.getFilterByCategory = async (id) => {
  try {
    return await productService.getFilterByCategory(id);
  } catch (error) {
    return null;
  }
};

exports.getFilterByBrand = async (id) => {
  try {
    return await productService.getFilterByBrand(id);
  } catch (error) {
    return null;
  }
};

exports.getFilterByClassify = async (id) => {
  try {
    return await productService.getFilterByClassify(id);
  } catch (error) {
    return null;
  }
};

exports.getTopDiscount = async () => {
  try {
    return await productService.getTopDiscount();
  } catch (error) {
    return null;
  }
};

exports.sortPriceHighToLow = async () => {
  try {
    return await productService.sortPriceHighToLow();
  } catch (error) {
    return null;
  }
};

exports.sortPriceLowToHigh = async () => {
  try {
    return await productService.sortPriceLowToHigh();
  } catch (error) {
    return null;
  }
};

exports.sortByNameAz = async () => {
  try {
    return await productService.sortByNameAz();
  } catch (error) {
    return null;
  }
};

exports.sortByNameZa = async () => {
  try {
    return await productService.sortByNameZa();
  } catch (error) {
    return null;
  }
};

exports.insert = async (product) => {
  try {
    await productService.insert(product);
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (id, product) => {
  try {
    await productService.update(id, product);
  } catch (error) {
    return null;
  }
};
