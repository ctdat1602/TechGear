const userService = require("./service");
const bcrypt = require("bcryptjs");

exports.login = async (email, password) => {
  try {
    const user = await userService.login(email);
    if (!user) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return null;
    }
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthday: user.birthday,
      address: user.address,
      image: user.image,
      status: user.status,
    };
  } catch (error) {
    return null;
  }
};

exports.register = async (
  email,
  password,
  confirmPassword,
  name,
  phone,
  birthday,
  address,
  image,
  status
) => {
  let user = await userService.login(
    email,
    password,
    confirmPassword,
    name,
    phone,
    birthday,
    address,
    image,
    status
  );
  if (user) {
    return null;
  }
  const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
  user = await userService.register(
    email,
    hash,
    name,
    phone,
    birthday,
    address,
    image,
    status
  );
  return { _id: user.id };
};

exports.updateRegister = async (
  id,
  email,
  name,
  phone,
  birthday,
  address,
  image
) => {
  try {
    await userService.updateRegister(
      id,
      email,
      name,
      phone,
      birthday,
      address,
      image
    );
    return true;
  } catch (error) {
    return false;
  }
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
  let user = await userService.login(email);
  if (user) {
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.update(
      email,
      hash,
      name,
      phone,
      birthday,
      address,
      image
    );
    return {
      email: user.email,
    };
  } else {
    return null;
  }
};

// exports.update = async (
//   email,
//   password,
//   name,
//   phone,
//   birthday,
//   address,
//   image
// ) => {
//   let user = await userService.login(username);
//   if (user) {
//     const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
//     console.log("user", hash);
//     user = await userService.update({
//       email,
//       password: hash,
//       name,
//       phone,
//       birthday,
//       address,
//       image,
//     });
//     return {
//       username: user.username,
//     };
//   } else {
//     return null;
//   }
// };

exports.updateStatus = async (id, user) => {
  try {
    await userService.updateStatus(id, user);
  } catch (error) {
    return false;
  }
};

exports.getCustomers = async () => {
  try {
    let users = await userService.getCustomers();
    users = users.map((item) => {
      item = {
        _id: item._id,
        email: item.email,
        name: item.name,
        phone: item.phone,
        birthday: item.birthday,
        address: item.address,
        image: item.image,
        status: item.status,
      };
      return item;
    });
    return users;
  } catch (error) {
    return null;
  }
};
