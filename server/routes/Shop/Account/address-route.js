const express = require("express");
const { AddNewAddress, GetAllAddress, EditAddress, DeleteAddress } = require("../../../controllers/Shop/address-controller");
const router = express.Router();
const {Check_User} = require("../../../middleware/Auth/auth-middleware");

// All routes related to address

router.post("/add", Check_User ,AddNewAddress);
router.get("/getaddress/:userId" , Check_User,GetAllAddress);
router.put("/edit-address/:userId/:addressId" , Check_User , EditAddress);
router.delete("/delete-address/:userId/:addressId" , Check_User , DeleteAddress);

module.exports = router;