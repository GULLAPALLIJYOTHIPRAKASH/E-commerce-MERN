const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail} = require("../../helper/Emails/mailServices");


// register user 
const RegisterUser = async (request , response) => {

    try {

        const {username , email , password , role} = request.body;

        

    
        if(!username || !email || !password){

            return(
                response.status(400).json({
                    success:false,
                    message:"username , email , password is required"
                })
            )
        }

        // check user already exist or not
        const check_user =  await UserModel.findOne({$or : [{username} , {email}]});

        if(check_user){

            return(
                response.status(200).json({
                    success:false,
                    message:"User Already Exists,please try different email or username"
                })
            )
        }


        // hash pwd
        const gen_salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password , gen_salt);


        // 6 digit otp
        const otp =  Math.floor(100000 + Math.random() * 900000);
        // 1 hour
        const verification_code_expiry = new Date(Date.now() + 60 * 60 * 1000);


        // store  in DB (new user account)
        const newUser  = await UserModel.create({

            username,
            email,
            password:hashPassword,
            role: role ? "seller" : "user",
            verify_email:false,
            otp,
            verification_code_expiry
            
        });


        sendVerificationEmail(email , otp)

        if(newUser){

            return(
                response.status(201).json({
                    success:true,
                    message:"User registered successfuly"
                })
            )
        }else{

            return(
                response.status(400).json({
                    success:false,
                    message:"User not registered successfuly"
                })
            )
        }
        
    } catch (error) {
        
        return(
            response.status(500).json({
                success:false,
                message: error.message || "Register user failed"
            })
        )
    }
}


// Login user
const LoginUser = async (request , response) => {

    try {

        const {email , password} = request.body;

        

        if(!email || !password){

            return(
                response.status(400).json({

                    success:false,
                    message:"email, password is required"
                })
            )
        }

        // check user exist or not
        const check_user = await UserModel.findOne({email});

        if(!check_user){

            return(
                response.status(404).json({

                    success:false,
                    message:"User not Found,Please try with different Email"
                })
            )
        }

        // email verify
        if(check_user?.verify_email === false){

            response.status(403).json({
                success:false,
                message:"Please verify your email account"
            })


        }



        // password check 
        const passwordCompare = await bcrypt.compare(password , check_user.password);

        if(!passwordCompare){

            return(
                response.status(404).json({
                    success:false,
                    message:"Invalid Credentials"
                })
            )
        }

        // then token generate
        const token = await jwt.sign({
            id:check_user._id,
            username:check_user.username,
            email:check_user.email,
            role:check_user.role,
            verify_email:true

        } , process.env.JWT_SECRET_KEY , { expiresIn: "3h"});


        // set at cookie
        // dev -> secure false , samesite lax
        return(
            response.cookie("token" , token, {httpOnly:true , secure: process.env.DEV_LOCAL === "T" ? false :true ,sameSite: process.env.DEV_LOCAL  === "T" ? "Lax" : "None", maxAge: 3 * 60 * 60 * 1000 }).json({

                success:true,
                message:"User Login Successfuly",
                data: {
                        id:check_user._id,
                        username:check_user.username,
                        email:check_user.email,
                        role:check_user.role,
                        verify_email:true
                }
            })
        )
        
    } catch (error) {
        
        return(
            response.status(500).json({
                success:false,
                message: error.message || "login user failed"
            })
        )
    }
}



// Logout user
const LogoutUser = async (request , response) => {

    try {

        // clear token when logout
        response.clearCookie("token").json({
            success:true,
            message:"User Logout Successfuly"
        });
        
    } catch (error) {
        
        return(
            response.status(500).json({
                success:false,
                message: error.message || "logout user failed"
            })
        )
    }
}


// verify email
const VerifyEmail = async (req, res) => {
  try {
    const { email, verify_otp:otp } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    if (user?.verification_code_expiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (user?.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    

    user.verify_email = true;
    user.otp = "";
    user.verification_code_expiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Generate new otp
const ResendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if(user?.verification_code_expiry < new Date()){

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.verification_code_expiry = new Date(Date.now() + 60 * 60 * 1000);

    await user.save();

    await sendVerificationEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "New OTP sent to your email",
    });

}

else{

    res.status(301).json({
      success: true,
      message: "Already OTP sent to your email",
    });

}
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = { RegisterUser , LoginUser , LogoutUser , VerifyEmail , ResendOTP}