const UserModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// register user 
const RegisterUser = async (request , response) => {

    try {

        const {username , email , password} = request.body;

        

    
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


        // store  in DB (new user account)
        const newUser  = await UserModel.create({

            username,
            email,
            password:hashPassword,
            role:"user"
        });


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
            role:check_user.role

        } , process.env.JWT_SECRET_KEY , { expiresIn: "3h"});


        // set at cookie
        // dev -> secure false , samesite lax
        return(
            response.cookie("token" , token, {httpOnly:true , secure: process.env.DEV_LOCAL === "T" ? false :true ,sameSite: process.env.DEV_LOCAL ? "Lax" : "None", maxAge: 3 * 60 * 60 * 1000 }).json({

                success:true,
                message:"User Login Successfuly",
                data: {
                        id:check_user._id,
                        username:check_user.username,
                        email:check_user.email,
                        role:check_user.role
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


module.exports = { RegisterUser , LoginUser , LogoutUser}