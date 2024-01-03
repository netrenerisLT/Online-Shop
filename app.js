const express = require("express");
const authRoutes = require("./routes/auth.routes");
const path = require("path");
const db = require("./data/database");
const csrf = require("csurf");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); //handle data attached to forms and requests

app.use(csrf());

app.use(authRoutes);

db.connectDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database");
    console.log(error);
  });
