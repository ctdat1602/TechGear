const orderModel = require("./model");

exports.getOrder = async () => {
  return order = await orderModel.find().populate("productId userId");
};

exports.getOrderById = async (id) => {
  try {
    return order = await orderModel.findById(id).populate("productId userId");
  } catch (error) {
    console.log(error)
  }
};

exports.postOrder = async payload => {
  return order = await orderModel.create(payload);
};

exports.update = async (id, order) => {
  try {
    await orderModel.findByIdAndUpdate(id, order);
  } catch (error) {
    return false;
  }
};

exports.getKPI = async () => {
  try {
    return kpi = await orderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$quantity" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])
  } catch (error) {
    return false;
  }
}

exports.getRevenue = async () => {
  try {
    return revenue = await orderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalPrice: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },

    ])
  } catch (error) {
    return false;
  }
}

exports.sortByPirceRevenueLowToHigh = async () => {
  try {
    return revenue = await orderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalPrice: { $sum: "$total" },
        },
      },
      { $sort: { totalPrice: 1 } },
    ])
  } catch (error) {
    return false;
  }
}

exports.sortByPirceRevenueHighToLow = async () => {
  try {
    return revenue = await orderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalPrice: { $sum: "$total" },
        },
      },
      { $sort: { totalPrice: -1 } },
    ])
  } catch (error) {
    return false;
  }
}


exports.sortByDateDecToJan = async () => {
  try {
    return revenue = await orderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalPrice: { $sum: "$total" },
        },
      },
      { $sort: { _id: -1 } },
    ])
  } catch (error) {
    return false;
  }
}

exports.totalTurnover = async () => {
  try {
    return revenue = await orderModel.aggregate([
      {
        $group: {
          _id: { $year: "$createdAt" },
          totalPrice: { $sum: "$total" },
        },
      },
    ])
  } catch (error) {
    return false;
  }
}