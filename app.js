const express = require("express");
const authRoutes = require("./routes/auth.routes");
const path = require("path");
const db = require("./data/database");
const csrf = require("csurf");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const app = express();

//enable EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//sets access of CSS files to public
app.use(express.static("public"));

//handle data attached to forms and requests
app.use(express.urlencoded({ extended: false }));

// Add csrf protection
app.use(csrf());
app.use(addCsrfTokenMiddleware);

// enable routes
app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database");
    console.log(error);
  });
