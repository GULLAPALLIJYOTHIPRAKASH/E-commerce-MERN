const express = require("express");
const { Check_User } = require("../../../middleware/Auth/auth-middleware");
const { GetAllBanners, GetAllProducts } = require("../../../controllers/Shop/Home/home-controller");
const router = express.Router();

// All routes related to Home 

router.get("/allbanners" ,Check_User , GetAllBanners);
router.get("/products" , Check_User ,GetAllProducts )

module.exports = router;