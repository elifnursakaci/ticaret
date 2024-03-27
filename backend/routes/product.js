const express = require("express");

const {
  allProducts,
  detailProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require("../controllers/product");
const { authhenticationMid, roleChecked } = require("../middleware/auth");

const router = express.Router();

router.get("/products", allProducts);
router.get(
  "/admin/products",
  authhenticationMid,
  roleChecked("admin"),
  adminProducts
);

router.get("/products/:id", detailProducts);

router.post(
  "/products/new",
  authhenticationMid,
  roleChecked("admin"),
  createProduct
);

router.post("/products/newReview", authhenticationMid, createReview);

router.delete(
  "/products/:id",
  authhenticationMid,
  roleChecked("admin"),
  deleteProduct
);

router.put(
  "/products/:id",
  authhenticationMid,
  roleChecked("admin"),
  updateProduct
);

module.exports = router;
