const adminService = require("./service");
const adminModel = require("./model");
const bcrypt = require("bcryptjs");

exports.login = async (email, password) => {
  try {
    const admin = await adminService.login(email);
    if (!admin) return null;
    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return null;
    }

    return {
      _id: admin._id,
      email: admin.email,
      fullName: admin.fullName,
      phone: admin.phone,
      birthday: admin.birthday,
      address: admin.address,
      image: admin.image,
    };
  } catch (error) {
    return null;
  }
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
  let admin = await adminService.login(
    email,
    password,
    fullName,
    phone,
    birthday,
    address,
    image
  );
  if (admin) {
    return null;
  }
  const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
  admin = await adminService.register(
    email,
    hash,
    fullName,
    phone,
    birthday,
    address,
    image
  );
  return { _id: admin.id };
};
