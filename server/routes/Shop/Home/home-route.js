const express = require("express");
const { Check_User } = require("../../../middleware/Auth/auth-middleware");
const { GetAllBanners } = require("../../../controllers/Shop/Home/home-controller");
const router = express.Router();

// All routes related to Home 

router.get("/allbanners" ,Check_User , GetAllBanners);

module.exports = router;