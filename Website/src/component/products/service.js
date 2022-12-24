const productModel = require("./model");

exports.getProduct = async () => {
  try {
    return await productModel.find().populate("categoryId brandId classifyId");
  } catch (error) {
    console.log(error);
  }
};

exports.getProductById = async (id) => {
  try {
    return (product = await productModel
      .findById(id)
      .populate("categoryId brandId classifyId"));
  } catch (error) {
    console.log(error);
  }
};

exports.getFilterByCategory = async (id) => {
  try {
    return (product = await productModel.find({ categoryId: id }).populate("categoryId brandId classifyId"));
  } catch (error) {
    console.log(error);
  }
};

exports.getFilterByBrand = async (id) => {
  try {
    return (product = await productModel.find({ brandId: id }).populate("categoryId brandId classifyId"));
  } catch (error) {
    console.log(error);
  }
};

exports.getFilterByClassify = async (id) => {
  try {
    return (product = await productModel.find({ classifyId: id }).populate("categoryId brandId classifyId"));
  } catch (error) {
    console.log(error);
  }
};

exports.getTopDiscount = async () => {
  try {
    return (product = await productModel.aggregate([
      {
        $project: {
          name: 1,
          image: 1,
          price: 1,
          discountPrice: 1,
          quantity: 1,
          firstDate: 1,
          insurance: 1,
          descriptions: 1,
          image: 1,
          total: {
            $subtract: ["$price", "$discountPrice"],
          },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 10 },
    ]));
  } catch (error) {
    console.log(error);
  }
};

exports.sortPriceLowToHigh = async () => {
  try {
    return (product = await productModel.aggregate([
      {
        $project: {
          name: 1,
          image: 1,
          price: 1,
          discountPrice: 1,
          quantity: 1,
          firstDate: 1,
          insurance: 1,
          descriptions: 1,
          image: 1,
        },
      },
      { $sort: { price: 1 } },
    ]));
  } catch (error) {
    console.log(error);
  }
}


exports.sortPriceHighToLow = async () => {
  try {
    return (product = await productModel.aggregate([
      {
        $project: {
          name: 1,
          image: 1,
          price: 1,
          discountPrice: 1,
          quantity: 1,
          firstDate: 1,
          insurance: 1,
          descriptions: 1,
          image: 1,
        },
      },
      { $sort: { price: -1 } },
    ]));
  } catch (error) {
    console.log(error);
  }
}

exports.sortByNameAz = async () => {
  try {
    return (product = await productModel.aggregate([
      {
        $project: {
          name: 1,
          image: 1,
          price: 1,
          discountPrice: 1,
          quantity: 1,
          firstDate: 1,
          insurance: 1,
          descriptions: 1,
          image: 1,
        },
      },
      { $sort: { name: 1 } },
    ]));
  } catch (error) {
    console.log(error);
  }
}

exports.sortByNameZa = async () => {
  try {
    return (product = await productModel.aggregate([
      {
        $project: {
          name: 1,
          image: 1,
          price: 1,
          discountPrice: 1,
          quantity: 1,
          firstDate: 1,
          insurance: 1,
          descriptions: 1,
          image: 1,
        },
      },
      { $sort: { name: -1 } },
    ]));
  } catch (error) {
    console.log(error);
  }
}

exports.insert = async (product) => {
  const p = new productModel(product);
  await p.save();
};

exports.update = async (id, product) => {
  await productModel.findByIdAndUpdate(id, product);
};
