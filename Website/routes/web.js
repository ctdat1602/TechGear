var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const PAGE_SIZE = 8;

const adminController = require("../src/component/admin/controller");
const productController = require("../src/component/products/controller");
const categoryController = require("../src/component/categories/controller");
const brandController = require("../src/component/brands/controller");
const classifyController = require("../src/component/classifies/controller");
const newspaperController = require("../src/component/newspapers/controller");
const userController = require("../src/component/user/controller");

const upload = require("../src/middle/upload");

const productModel = require("../src/component/products/model");
const newspaperModel = require("../src/component/newspapers/model");
const usersModel = require("../src/component/user/model");

/* GET Account . */
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", async function (req, res, next) {
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
    req.session.token = token;
    res.redirect("/home");
  } else {
  }
});

router.post("/register", async function (req, res, next) {
  const { email, password, fullName, phone, birthday, address, image } =
    req.body;
  const admin = await adminController.register(
    email,
    password,
    fullName,
    phone,
    birthday,
    address,
    image
  );
  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        fullName: admin.fullName,
        phone: admin.phone,
        birthday: admin.birthday,
        address: admin.address,
        image: admin.image,
      },
      "mykey"
    );
    req.session.token = token;
    res.redirect("/");
  } else {
    res.redirect("/register");
  }
});

/* GET Pages . */
router.get("/home", function (req, res, next) {
  res.render("home");
});

// ============================ PRODUCT ============================

router.get("/product", async function (req, res, next) {
  const name = req.query.name;
  var page = req.query.page;
  if (name) {
    productModel
      .find({ name: { $regex: new RegExp(name), $options: "i" } })
      .then((product) => {
        res.render("product", { product: product });
      });
  }

  if (page) {
    page = parseInt(page);
    var pageNumber = (page - 1) * PAGE_SIZE;
    productModel
      .find({})
      .skip(pageNumber)
      .limit(PAGE_SIZE)
      .then((product) => {
        res.render("product", { product: product });
      });
  } else {
    const product = await productController.getProduct();
    res.render("product", { product: product });
  }
});

router.get("/productAdd", async function (req, res, next) {
  const categories = await categoryController.getCategory();
  const brand = await brandController.getBrand();
  const classify = await classifyController.getClassify();
  res.render("productInsert", {
    categories: categories,
    brand: brand,
    classify: classify,
  });
});

router.post(
  "/product",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file } = req;
    let image = "";
    if (file) {
      image = `https://10.100.100.7:3000/images/${file.filename}`;
    }
    body = { ...body, image };
    await productController.insert(body);

    res.redirect("/product");
  }
);

router.get("/:id/productEdit", async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getProductById(id);
  console.log("product", product);
  const categories = await categoryController.getCategoriesSelected(
    product.categoryId._id
  );
  const brand = await brandController.getBrandSelected(product.brandId._id);
  const classify = await classifyController.getClassifySelected(
    product.classifyId._id
  );
  res.render("productEdit", {
    product: product,
    categories: categories,
    brand: brand,
    classify: classify,
  });
});

router.post(
  "/:id/productEdit",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file, params } = req;
    delete body.image;
    if (file) {
      let image = `https://10.100.100.7:3000/images/${file.filename}`;
      body = { ...body, image };
    }
    await productController.update(params.id, body);
    res.redirect("/product");
  }
);

// ============================ NEWSPAPER ============================

router.get("/newspaper", async function (req, res, next) {
  const name = req.query.name;
  if (name) {
    newspaperModel
      .find({ name: { $regex: new RegExp(name), $options: "i" } })
      .then((newspaper) => {
        res.render("newspaper", { newspaper: newspaper });
      });
  } else {
    const newspaper = await newspaperController.getNewspaper();
    res.render("newspaper", { newspaper: newspaper });
  }
});

router.get("/newspaperAdd", async function (req, res, next) {
  res.render("newspaperInsert");
});

router.post(
  "/newspaper",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file } = req;
    let image = "";
    if (file) {
      image = `https://10.100.100.83:3000images/${file.filename}`;
    }
    body = { ...body, image };
    await newspaperController.insert(body);
    res.redirect("/newspaper");
  }
);

router.get("/:id/newspaperEdit", async function (req, res, next) {
  const { id } = req.params;
  const newspaper = await newspaperController.getNewspaperByID(id);
  res.render("newspaperEdit", { newspaper: newspaper });
});

router.post(
  "/:id/newspaperEdit",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file, params } = req;
    delete body.image;
    if (file) {
      let image = `https://10.100.100.83:3000/images/${file.filename}`;
      body = { ...body, image };
    }
    await newspaperController.update(params.id, body);
    res.redirect("/newspaper");
  }
);

// ============================ USER ============================

router.get("/customers", async function (req, res, next) {
  const email = req.query.email;
  if (email) {
    usersModel
      .find({ email: { $regex: new RegExp(email), $options: "i" } })
      .then((user) => {
        res.render("customers", { user: user });
      });
  } else {
    const user = await userController.getCustomers();
    res.render("customers", { user: user });
  }
});

router.delete("/:id/userDelete", async function (req, res, next) {
  const { id } = req.params;
  await userController.delete(id);
  res.json({
    result: true,
  });
});

router.get("/thongKe", async function (req, res, next) {
  res.render("thongKe");
});

module.exports = router;
