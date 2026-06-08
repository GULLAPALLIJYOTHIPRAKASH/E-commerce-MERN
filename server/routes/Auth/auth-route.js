const express = require("express");
const { RegisterUser, LoginUser, LogoutUser } = require("../../controllers/Auth/auth-controller");
const { Check_User } = require("../../middleware/Auth/auth-middleware");
const router = express.Router();

// All routes related to auth

router.post("/register" , RegisterUser);
router.post("/login" , LoginUser);
router.post("/logout" ,LogoutUser );

router.get('/checkuser' , Check_User , (req , res) => {

    const user = req.user;

    return(
        res.status(200).json({
            success:true,
            message:"User Authenticated",
            data: {
                ...user
            }
        })
    )

})

module.exports = router;