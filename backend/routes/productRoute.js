const express = require("express");
const { getAllProducts,createProducts, updateProduct, deleteProduct, getProductDetail } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();



router.route("/products").get(isAuthenticatedUser, getAllProducts);

router.route("/product/new").post(isAuthenticatedUser,createProducts);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetail);


module.exports = router;