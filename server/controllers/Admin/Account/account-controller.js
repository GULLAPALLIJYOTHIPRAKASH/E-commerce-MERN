const UserModel = require("../../../models/User");


// Get all user accounts only admin
const GetAllUserAccounts = async (request , response) => {


   try {


     const {role } = request.user;

   
     if(role === "admin"){

        const allusers = await UserModel.find({}).sort({updatedAt:-1});

        if(allusers.length > 0){

            return(
                response.status(200).json({
                    success:true ,
                    message:"Available Users List",
                    data:allusers
                })
            )
        }
        else{
              return(
                response.status(200).json({
                    success:false ,
                    message:"No Users Available",
                    data:[]
                })
            )
        }
     }else{

          return(
                response.status(401).json({
                    success:false ,
                    message:"Only Admin can access it",
                    data:[]
                })
            )
        }
     
    
   } catch (error) {

    return(
        response.status(500).json({
            success:false,
            message:  error.message || "GetAllUserAccounts Failed"
        })
    )
    
   }
}


// delete user account  only admin
const DeleteUserAccount = async (request , response) => {


   try {


     const {role } = request.user;
     const {userId} = request.params;

   
     if(role === "admin"){

        const userAccount = await UserModel.findByIdAndDelete(userId);

        if(userAccount){

            return(
                response.status(200).json({
                    success:true ,
                    message:"User Account Deleted Successfully",
                    
                })
            )
        }
        else{
              return(
                response.status(404).json({
                    success:false ,
                    message:"No User Account Found",
                })
            )
        }
     }else{

          return(
                response.status(401).json({
                    success:false ,
                    message:"Only Admin can access it",
                    data:[]
                })
            )
        }
     
    
   } catch (error) {

    return(
        response.status(500).json({
            success:false,
            message: error.message || "GetAllUserAccounts Failed"
        })
    )
    
   }
}

// update user account  only admin
const UpdateUserAccount = async (request , response) => {


   try {


     const {role } = request.user;
    const {userId} = request.params;
    const {Newrole} = request.body;


   
     if(role === "admin"){

        const user = await UserModel.findByIdAndUpdate(userId , 
        {role: Newrole},
        {new : true}

        )


        if(user){

            return(
                response.status(200).json({
                    success:true ,
                    message:"Users role Updated Successfully",
                    data:user
                })
            )
        }
        else{
              return(
                response.status(404).json({
                    success:false ,
                    message:"No Users Available",
                })
            )
        }
     }else{

          return(
                response.status(401).json({
                    success:false ,
                    message:"Only Admin can access it",
                    data:[]
                })
            )
        }
     
    
   } catch (error) {

    return(
        response.status(500).json({
            success:false,
            message:  error.message || "GetAllUserAccounts Failed"
        })
    )
    
   }
}

module.exports = {GetAllUserAccounts , DeleteUserAccount  , UpdateUserAccount};