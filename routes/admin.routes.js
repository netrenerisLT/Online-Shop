const express = require("express");
const adminController = require("../controllers/admin.controller");
const configuredMulterMiddleware = require("../middlewares/image-upload");
const router = express.Router();

router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

router.post(
  "/products",
  configuredMulterMiddleware,
  adminController.createNewProduct
);

module.exports = router;
