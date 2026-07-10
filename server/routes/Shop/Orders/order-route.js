const express  = require("express");
const router = express.Router();

const {Check_User} = require("../../../middleware/Auth/auth-middleware");
const { CreateOrder, CaptureOrder, GetAllOrders, GetSingleOrder } = require("../../../controllers/Shop/order-controller");

// All routes related to orders

router.post("/create" , Check_User , CreateOrder );
router.post("/capture-order" , Check_User , CaptureOrder );
router.get("/allorders/:userId" , Check_User ,GetAllOrders);
router.get("/orderdetails/:userId/:orderId", Check_User ,GetSingleOrder);

module.exports = router;