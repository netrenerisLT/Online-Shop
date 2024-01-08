function getProducts(res, res) {
  res.render("admin/products/all-products");
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

function createNewProduct(req, res) {
  console.log(req.body);
  console.log(req.file);
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
