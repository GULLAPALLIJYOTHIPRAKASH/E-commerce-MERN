const { response } = require("express");
const BannerModel = require("../../../models/Banner");


// Get All Banners
const GetAllBanners = async (request , response) => {

    try {
        
        const banners = await BannerModel.find({});

        if(banners.length > 0){

            return(
                response.status(200).json({

                    success:true,
                    message:"All Available Banners",
                    data:banners
                })
            )
        }else{

            return(
                response.status(200).json({

                    success:false,
                    message:"No Banners Available"
                })
            )
        }
    } catch (error) {
        
        console.log(error);

        return (response.status(400).json({
            success:false,
            message: error.message || "Get All Home Banners failed."
        }))
        
    }
}

module.exports = { GetAllBanners};