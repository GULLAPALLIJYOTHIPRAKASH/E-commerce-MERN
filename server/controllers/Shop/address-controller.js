const AddressModel = require("../../models/Address");


// Add new address
const AddNewAddress = async (request , respone) => {

    try {

        const {address , city, pincode , phone, notes , userId} = request.body;

        if(!address || !city || !pincode || !phone || !notes || !userId){


            return(
                respone.status(400).json({
                    success:false,
                    message:"Invalid Data"
                })
            )
        }


        const newAddress = await AddressModel.create({
            address , city, pincode , phone, notes , userId

        })
        
        return(respone.status(201).json({
            success:true,
            message:"New Address Added Successfully"
        }))
        
    } catch (error) {
        
        return(respone.status(500).json({
            success:false,
            message: error.message || "Add new address is failed"
        }))
    }
}


// fetch all address
const GetAllAddress =  async (request , respone) => {

    try {

        const {userId}= request.params;

        console.log(userId);
        
        const addressList = await AddressModel.find({userId});

        if(addressList.length > 0){

             return(respone.status(200).json({
            success:true,
            message:"Address available",
            data:addressList
        }));

        }else{


            return(
                respone.status(404).json({

                    success:false,
                    message:"No address available"
                })
            )
        }
        
    } catch (error) {
        
        return(respone.status(500).json({
            success:false,
            message: error.message || "Get all address is failed"
        }))
    }
}

// edit Address 
const EditAddress =  async (request , respone) => {

    try {

        const formData = request.body;
        const {userId , addressId} =request.params; 

        if(!formData){

            return(
                respone.status(400).json({
                    success:false,
                    message:"Invalid Data"
                })
            )
        }


        let edti_Address = await AddressModel.findByIdAndUpdate({_id:addressId, userId} , formData , {new:true});


        if(!edti_Address){


            return(
                respone.status(404).json({

                    success:false,
                    message:"No address available"
                })
            )
        }

        return(respone.status(200).json({
            success:true,
            message:"Address updated Successfully",
            data:edti_Address
        }));



        
        
    } catch (error) {
        
        return(respone.status(500).json({
            success:false,
            message: error.message || "Edit address is failed"
        }))
    }
}


// Delete address
const DeleteAddress =  async (request , respone) => {

    try {
        const {userId , addressId} =request.params; 

       


        let delete_Address = await AddressModel.findByIdAndDelete({_id:addressId, userId});


        if(!delete_Address){


            return(
                respone.status(404).json({

                    success:false,
                    message:"No address available"
                })
            )
        }

        return(respone.status(200).json({
            success:true,
            message:"Address delete Successfully",
        }));



        
        
    } catch (error) {
        
        return(respone.status(500).json({
            success:false,
            message: error.message || "Delete address is failed"
        }))
    }
}

module.exports = {AddNewAddress  , GetAllAddress  , EditAddress , DeleteAddress}