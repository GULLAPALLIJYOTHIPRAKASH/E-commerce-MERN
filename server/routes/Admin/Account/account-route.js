const express = require("express");
const { Check_User, CheckAdmin_User } = require("../../../middleware/Auth/auth-middleware");
const { GetAllUserAccounts, UpdateUserAccount, DeleteUserAccount } = require("../../../controllers/Admin/Account/account-controller");
const router = express.Router();

// All routes related to dashboard

router.get("/allusers" ,Check_User ,CheckAdmin_User ,GetAllUserAccounts );
router.put("/update-account/:userId" ,Check_User ,CheckAdmin_User ,UpdateUserAccount );
router.delete("/delete-account/:userId" ,Check_User ,  CheckAdmin_User ,DeleteUserAccount);



module.exports = router;