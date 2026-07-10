const express = require("express");
const { GetAllOrders, UpdateOrderStatus, GetSingleOrder } = require("../../../controllers/Admin/Orders/order-controllers");
const router = express.Router();
const {Check_User, CheckAdmin_User} = require("../../../middleware/Auth/auth-middleware");


// all routes related to admin orders


router.get("/allorders", Check_User , CheckAdmin_User , GetAllOrders);
router.get("/orderdetails/:orderId", Check_User , CheckAdmin_User , GetSingleOrder);
router.put("/update-orderstatus/:orderId", Check_User, CheckAdmin_User , UpdateOrderStatus);

module.exports = router;