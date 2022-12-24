var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const upload = require("../src/middle/upload");
const adminController = require("../src/component/admin/controller");
const userController = require("../src/component/user/controller");
const productController = require("../src/component/products/controller");
const orderController = require("../src/component/order/controller");
const newspaperController = require("../src/component/newspapers/controller");
const categoryController = require("../src/component/categories/controller");
const brandController = require("../src/component/brands/controller");
const classifyController = require("../src/component/classifies/controller");
const Product = require("../src/component/products/model");

/* ---------------------------- Authentication ----------------------------  */

//Executor: Thanh Nam (Contact if there is a problem)

//Register | Status: {Active}
router.post("/register", async function (req, res, next) {
  const {
    email,
    password,
    confirmPassword,
    name,
    phone,
    birthday,
    address,
    image,
    status,
  } = req.body;
  const user = await userController.register(
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
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

//Login | Status: {Active}
router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const user = await userController.login(email, password);

  if (user.status === 1) {
    return res.status(401).json({
      Waring:
        "Tài khoản của bạn đã bị khóa, vui lòng liên hệ với nhân viên cửa hàng!",
    });
  }

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        birthday: user.birthday,
        address: user.address,
        image: user.address,
        status: user.status,
      },
      "mykey"
    );
    console.log("token__API_USER", token);
    res.json({
      status: true,
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthday: user.birthday,
      address: user.address,
      image: user.address,
      status: user.status,
      token,
    });
  } else {
    res.json({ status: 404 });
  }
});

router.post("/:id/user/updateStatus", async function (req, res) {
  try {
    let { body, params } = req;
    const user = await userController.updateStatus(params.id, body);
    res.json(user);
  } catch (error) {
    return error;
  }
});

router.post("/admin/login", async function (req, res, next) {
  const { email, password } = req.body;
  const admin = await adminController.login(email, password);
  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      "mykey"
    );
    res.json({ status: true, id: admin._id, email: admin.email, token });
  } else {
  }
});

router.post(
  "/user/edit",
  [upload.single("image")],
  async function (req, res, next) {
    const { email, password, name, birthday, phone, address, image } = req.body;
    console.log(req.body);
    const { file } = req;
    let img = image || undefined;
    if (file) {
      img = `http://10.100.100.7:3000/images/${file.filename}`;
    }
    const user = await userController.update(
      email,
      password,
      name,
      birthday,
      phone,
      address,
      img
    );
    user
      ? res.json({
          email,
          password,
          name,
          birthday,
          phone,
          address,
          image,
          status: 404,
        })
      : res.json({ status: 200 });
  }
);

/* ---------------------------- Product ----------------------------  */

//Executor: Tan Dat (Contact if there is a problem)

//Note: if discountPrice > 0, then display price and discountPrice with price { text-decoration: line-through } ! Opposite, if discountPrice = 0, then display only price

//Show all products | Status: {Active}
router.get("/product", async function (req, res, next) {
  const products = await productController.getProduct();
  res.json(products);
});

//Show product Detail | Status: {Active}
router.get("/product/:id", async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getProductById(id);
  res.json(product);
});

//Filter products by Category | Status: {Active}
router.get("/getfilterByCategory/:id", async function (req, res, next) {
  const { id } = req.params;
  const products = await productController.getFilterByCategory(id);
  res.json(products);
});

router.get("/getFilterByBrand/:id", async function (req, res, next) {
  const { id } = req.params;
  const products = await productController.getFilterByBrand(id);
  res.json(products);
});

router.get("/getFilterByClassify/:id", async function (req, res, next) {
  const { id } = req.params;
  const products = await productController.getFilterByClassify(id);
  res.json(products);
});

//Show top discount | Status: {Active}
router.get("/topDiscount", async function (req, res, next) {
  const products = await productController.getTopDiscount();
  res.json(products);
});

router.get("/sortPriceHighToLow", async function (req, res, next) {
  const products = await productController.sortPriceHighToLow();
  res.json(products);
});

router.get("/sortPriceLowToHigh", async function (req, res, next) {
  const products = await productController.sortPriceLowToHigh();
  res.json(products);
});

router.get("/sortByNameAz", async function (req, res, next) {
  const products = await productController.sortByNameAz();
  res.json(products);
});

router.get("/sortByNameZa", async function (req, res, next) {
  const products = await productController.sortByNameZa();
  res.json(products);
});

router.post(
  "/:id/productEdit",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file, params } = req;
    if (file) {
      let image = `https://10.100.100.7:3000/images/${file.filename}`;
      body = { ...body, image };
    }
    const product = await productController.update(params.id, body);
    res.json(product);
  }
);

router.post(
  "/productCreate",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file } = req;
    let image = "";
    if (file) {
      image = `https://10.100.100.7:3000/images/${file.filename}`;
    }
    body = { ...body, image };
    const product = await productController.insert(body);
    res.json(product);
  }
);

router.get("/search/:key", async function (req, res, next) {
  const products = await Product.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  res.send(products);
});

/* ---------------------------- Customers ----------------------------  */

//Executor: Tan Dat (Contact if there is a problem)

//Show all customers | Status: {Active}
router.get("/customers", async function (req, res, next) {
  const customer = await userController.getCustomers();
  res.json(customer);
});

//Show customer Detail | Status: {Active}
router.get("/customer/:id", async function (req, res, next) {
  const { id } = req.params;
  const customer = await userController.getCustomerById(id);
  res.json(customer);
});

/* ---------------------------- Order ----------------------------  */

//Executor: Tan Dat (Contact if there is a problem)

//Show all order | Status: {Active} | Note: Admin's function is not handled on mobile
router.get("/order", async function (req, res, next) {
  const order = await orderController.getOrder();
  res.json(order);
});

router.get("/kpi", async function (req, res, next) {
  const order = await orderController.getKPI();
  res.json(order);
});

router.get("/revenue", async function (req, res, next) {
  const order = await orderController.getRevenue();
  res.json(order);
});

router.get("/sortByPirceRevenueLowToHigh", async function (req, res, next) {
  const order = await orderController.sortByPirceRevenueLowToHigh();
  res.json(order);
});

router.get("/sortByPirceRevenueHighToLow", async function (req, res, next) {
  const order = await orderController.sortByPirceRevenueHighToLow();
  res.json(order);
});

router.get("/sortByDateDecToJan", async function (req, res, next) {
  const order = await orderController.sortByDateDecToJan();
  res.json(order);
});

router.get("/turnover", async function (req, res, next) {
  const order = await orderController.totalTurnover();
  res.json(order);
});

//Show order Detail | Status: {Active}
router.get("/order/:id", async function (req, res, next) {
  const { id } = req.params;
  const order = await orderController.getOrderById(id);
  res.json(order);
});

//Buy product | Status: {Active}
router.post("/postOrder", orderController.postOrder);

router.post("/:id/orderActive", async function (req, res, next) {
  try {
    let { body, params } = req;
    const order = await orderController.update(params.id, body);
    res.json(order);
  } catch (error) {
    return error;
  }
});

/* ---------------------------- Newspager ----------------------------  */

//Show new | Status: {Active}
router.get("/newspaper", async function (req, res, next) {
  const news = await newspaperController.getNewspaper();
  res.json(news);
});

router.get("/newspaper/:id", async function (req, res, next) {
  const { id } = req.params;
  const news = await newspaperController.getNewspaperByID(id);
  res.json(news);
});

router.post(
  "/newspaper",
  [upload.single("image")],
  async function (req, res, next) {
    let { body } = req;
    const news = await newspaperController.insert(body);
    res.json(news);
  }
);

router.post(
  "/:id/newspaperEdit",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file, params } = req;
    if (file) {
      let image = `https://10.100.100.7:3000/images/${file.filename}`;
      body = { ...body, image };
    }
    const news = await newspaperController.update(params.id, body);
    res.json(news);
  }
);

/* ---------------------------- Foreign key ----------------------------  */

router.get("/categories", async function (req, res, next) {
  const categories = await categoryController.getCategory();
  res.json(categories);
});

router.get("/brands", async function (req, res, next) {
  const brand = await brandController.getBrand();
  res.json(brand);
});

router.get("/classifies", async function (req, res, next) {
  const classifies = await classifyController.getClassify();
  res.json(classifies);
});

module.exports = router;
