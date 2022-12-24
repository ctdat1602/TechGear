var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const session = require("express-session");
const mongoose = require("mongoose");
require("./src/component/admin/model");
require("./src/component/products/model");
require("./src/component/user/model");
require("./src/component/newspapers/model");
require("./src/component/categories/model");
require("./src/component/brands/model");
require("./src/component/classifies/model");
require("./src/component/order/model")

var webRouter = require("./routes/web");
var apiRouter = require("./routes/api");

var app = express();
// ADD THIS
var cors = require('cors');
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "mykey",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
mongoose
  .connect(
    "mongodb+srv://DuAnTotNghiep:1234567890@cluster0.kgliszi.mongodb.net/AppTechGear?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected !"))
  .catch((err) => console.log("DB Error: ", err));

app.use("/", webRouter);
app.use("/api", apiRouter);



module.exports = app;
