const express = require("express");
const router = express.Router();
const { AllProducts, GetSingleProducts } = require("../../../controllers/Shop/product-controller");
const {Check_User} = require("../../../middleware/Auth/auth-middleware");
// All router related to shop products

router.get("/allproducts" , Check_User , AllProducts);
router.get("/:productId" , Check_User , GetSingleProducts);

module.exports = router;