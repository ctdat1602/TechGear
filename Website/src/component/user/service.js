const userModel = require("./model");

exports.login = async (email) => {
  const user = await userModel.findOne(
    {
      email: email,
    },
    "id email password name phone birthday address image status"
  );
  return user;
};

exports.register = async (
  email,
  password,
  name,
  phone,
  birthday,
  address,
  image,
  status
) => {
  const user = new userModel({
    email,
    password,
    name,
    phone,
    birthday,
    address,
    image,
    status,
  });
  return await user.save();
};

exports.update = async (
  email,
  password,
  name,
  phone,
  birthday,
  address,
  image
) => {
  return await userModel.updateOne(
    { email },
    { password, name, phone, birthday, address, image }
  );
};

exports.updateStatus = async (id, user) => {
  try {
    await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    return false;
  }
};

exports.getCustomers = async () => {
  return await userModel.find();
};
