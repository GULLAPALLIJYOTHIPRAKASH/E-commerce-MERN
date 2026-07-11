const express = require("express");
const router = express.Router();
const { Check_User } = require("../../../middleware/Auth/auth-middleware");
const { SearchProducts } = require("../../../controllers/Shop/search-controller");


// All routes related to search products

router.get("/:keyword" , Check_User , SearchProducts );

module.exports = router;