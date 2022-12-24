const orderServie = require('./service');
const productService = require('../products/service');

exports.getOrder = async () => {
  try {
    return await orderServie.getOrder();
  } catch (error) {
    return null;
  }
}

exports.getOrderById = async (id) => {
  try {
    return await orderServie.getOrderById(id);
  } catch (error) {
    return null;
  }
};

exports.postOrder = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  const status = Number.parseInt(req.body.status);
  let order = await orderServie.getOrder();
  let productDetails = await productService.getProductById(productId);
  try {
    const orderData = {
      productId: productId,
      userId: userId,
      quantity: quantity,
      status: status,
      total: parseInt((productDetails.price - productDetails.discountPrice) * quantity),
    }
    order = await orderServie.postOrder(orderData)
    res.json(order);
  } catch (err) {
    console.log(err)
  }
}

exports.update = async (id, order) => {
  try {
    await orderServie.update(id, order);
  } catch (error) {
    return false;
  }
};

exports.getKPI = async () => {
  try {
    return await orderServie.getKPI();
  } catch (error) {
    return null;
  }
};

exports.getRevenue = async () => {
  try {
    return await orderServie.getRevenue();
  } catch (error) {
    return null;
  }
};

exports.totalTurnover = async () => {
  try {
    return await orderServie.totalTurnover();
  } catch (error) {
    return null;
  }
};

exports.sortByPirceRevenueLowToHigh = async () => {
  try {
    return await orderServie.sortByPirceRevenueLowToHigh();
  } catch (error) {
    return null;
  }
};

exports.sortByPirceRevenueHighToLow = async () => {
  try {
    return await orderServie.sortByPirceRevenueHighToLow();
  } catch (error) {
    return null;
  }
};


exports.sortByDateDecToJan = async () => {
  try {
    return await orderServie.sortByDateDecToJan();
  } catch (error) {
    return null;
  }
};
