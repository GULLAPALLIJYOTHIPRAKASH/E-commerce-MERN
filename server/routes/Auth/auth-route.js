const express = require("express");
const { RegisterUser, LoginUser, LogoutUser, VerifyEmail, ResendOTP } = require("../../controllers/Auth/auth-controller");
const { Check_User } = require("../../middleware/Auth/auth-middleware");
const { AuthRateLimit } = require("../../middleware/rateLimit");
const router = express.Router();

// All routes related to auth

router.post("/register" ,AuthRateLimit , RegisterUser);
router.post("/login" , AuthRateLimit , LoginUser);
router.post("/logout"  ,LogoutUser );

router.get('/checkuser' , Check_User , (req , res) => {

    const user = req.user;


    if(user?.verfy_email === true){

        
        return(
            res.status(200).json({
                success:true,
                message:"User Authenticated",
                data: {
                    ...user
                }
            })
        )
    }
    else{


         return(
            res.status(403).json({
                success:false,
                message:"Please verify your email account",
                
            })
        )
    }

})


router.post("/verify_email" , AuthRateLimit , VerifyEmail);
router.post("/resend_otp" , AuthRateLimit , ResendOTP);

module.exports = router;