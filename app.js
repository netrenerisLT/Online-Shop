const express = require("express"); //1
const authRoutes = require("./routes/auth.routes"); //2
const productsRoutes = require("./routes/products.routes"); //7
const baseRoutes = require("./routes/base.routes"); //7
const adminRoutes = require("./routes/admin.routes"); //9
const cartRoutes = require("./routes/cart.routes"); //12
const ordersRoutes = require("./routes/orders.routes"); //14
const path = require("path"); //3
const db = require("./data/database"); //3
const csrf = require("csurf"); //4
const addCsrfTokenMiddleware = require("./middlewares/csrf-token"); //4
const errorHandlerMiddleware = require("./middlewares/error-handler"); //5
const checkAuthStatusMiddleware = require("./middlewares/check-auth"); //8
const protectRoutesMiddleware = require("./middlewares/protect-routes"); //10
const cartMiddleware = require("./middlewares/cart"); //11
const expressSession = require("express-session"); //6
const createSessionConfig = require("./config/session"); //6

const app = express();

//enable EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//sets access of CSS files to public
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));

//handle data attached to forms and requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressSession(createSessionConfig()));

// Add csrf protection
app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(cartMiddleware);

// enable routes
app.use(authRoutes);
app.use(productsRoutes);
app.use(baseRoutes);
app.use("/cart", cartRoutes);

app.use(protectRoutesMiddleware);
app.use("/admin", adminRoutes);
app.use("/orders", ordersRoutes);

// enable error handling when something wrong with the server
app.use(errorHandlerMiddleware);

db.connectDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database");
    console.log(error);
  });
