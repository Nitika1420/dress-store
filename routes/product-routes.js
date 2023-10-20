const express = require("express");
const router = express.Router();
const productController = require("../controller/product-controller");

router.get("/", (req, res) => {
  if (req.query.name) {
    return productController.getProductsByName(req, res);
  } else {
    return productController.getAllProducts(req, res);
  }
});

router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.delete("/", productController.deleteAllProducts);

module.exports = router;
