const express = require("express");
const { AddToCart, GetAllCartItems, UpdateCart } = require("../../../controllers/Shop/cart-controller");
const router = express.Router();
const { Check_User} = require("../../../middleware/Auth/auth-middleware")

// All routes related to cart

router.post('/add' , Check_User , AddToCart);
router.get("/getcart/:userId" , Check_User , GetAllCartItems);
router.put("/update-cart" , Check_User , UpdateCart );
router.delete("/delete-cart/:userId/:productId" , Check_User , UpdateCart);


module.exports = router;