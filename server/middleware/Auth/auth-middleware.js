const jwt = require("jsonwebtoken");


// check user 
const Check_User = async(request , response , next) => {

    try {

        
        // check token available in cookie
        const token = request.cookies.token;

        if(!token){

            return(

                response.status(401).json({

                    success:false,
                    message:"Token not found ,unauthorized user access"
                })
            )
        }


        // verify token 
        const decode_token  = await jwt.verify(token , process.env.JWT_SECRET_KEY);


        // send it , get user info from token 
        request.user = decode_token;

       return next();




        
    } catch (error) {

        return(
            response.status(400).json({
                success:false,
                message:error.message || "Check user failed"
            })
        )
        
    }
}


// check Admin User
const CheckAdmin_User = async(request , response , next) => {

    try {

        const user = request.user;


        // user role admin
        if(user.role === "admin"){

            return next();

        }

        else{

            return(
                response.status(401).json({
                  success:false,
                  message:"Invalid Admin Credentials"  
                })
            )
        }
        
    } catch (error) {

        return(
            response.status(400).json({
                success:false,
                message:error.message || "Admin Check user failed"
            })
        )
        
    }
}


module.exports = {Check_User , CheckAdmin_User}