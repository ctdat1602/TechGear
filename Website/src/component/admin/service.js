const adminModel = require("./model");

exports.login = async (email) => {
  const admin = await adminModel.findOne(
    {
      email: email,
    },
    "id email password fullName phone birthday address image"
  );
  return admin;
};

exports.register = async (
  email,
  password,
  fullName,
  phone,
  birthday,
  address,
  image
) => {
  const admin = new adminModel({
    email,
    password,
    fullName,
    phone,
    birthday,
    address,
    image,
  });
  return await admin.save();
};
