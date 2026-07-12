const cloudinary  = require("../../../config/cloudinary");
const BannerModel = require("../../../models/Banner");

// Add Banner Image 
const AddBanner = async (request , response )=> {


    try {

       const data = request.body;
       const {id} = request.user;
     

        const newBanner = new BannerModel({

            banner_url: data?.url,
            publicId:data?.publicId,
            createdBy:id,
            size:data?.size


            
        })

        // save in DB
        await newBanner.save();


        if(newBanner){


            return(
            response.status(201).json({
                success:true,
                message:"Banner Image Uploaded Successfuly"
            })
            )

        }else{

             return(
                response.status(400).json({

                    success:false,
                    message:" failed to add banner image , please try again"
                })
            )

        }



        
        
    } catch (error) {
        
        console.log(error);

        return(
            response.status(500).json({
                success:false,
                message:error.message || "Add Banner Failed"
            })
        )
        
    }
}


// Get All Banner 
const GetAllBanners =  async (request , response )=> {

    try {

        const allBanners = await BannerModel.find({});

        
        if(allBanners.length > 0 ){


            return(
            response.status(200).json({
                success:true,
                message:"Available Banner Images",
                data:allBanners
            })
            )

        }else{

             return(
                response.status(404).json({

                    success:false,
                    message:"No banners available , please try again"
                })
            )

        }
        
    } catch (error) {
        
        console.log(error);

        return(
            response.status(500).json({
                success:false,
                message:error.message || "Get All Banner Failed"
            })
        )
        
    }
}

// Delete banner cloudinary & DB
const DeleteBanner = async (request , response )=> {

    try {

        const bannerId = request.params.bannerId;
        const {id} = request.user;


        // check banner 
        const banner = await BannerModel.findById(bannerId);


        if(!banner){

            return(
                response.status(404).json({

                    success:false,
                    message:"Banner Not Found."
                })
            )
        }


        // check admin created banner
        if(banner.createdBy.toString() !==id){

            return(
                response.status(401).json({
                    success:false,
                    message:"UnAuthorize to delete banner Image"
                })
            )
        }


        // delete from cloudinary
        await cloudinary.uploader.destroy(banner?.publicId);

        // delete from DB
        const del_Banner = await BannerModel.findByIdAndDelete(banner?._id);


        if(del_Banner){

            return(
              
            response.status(200).json({
                success:true,
                message:"Banner deleted Successfuly"
            })
        
            )

        }
        else{

            return(
            response.status(400).json({
                success:false,
                message:"Delete  Banner Failed,please try again"
            })
        )
        }
        
    } catch (error) {
        
        console.log(error);

        return(
            response.status(500).json({
                success:false,
                message:error.message || "Delete  Banner Failed"
            })
        )
        
    }
}


// Delete Banner cloudinary
const DeleteBannerCloudinary = async (request , response )=> {

    try {

        const {publicId} = request.params;


        console.log(publicId);
        



        // delete cloudinary
        const del_Banner  = await cloudinary.uploader.destroy("E-Commerces/"+publicId);



        if(del_Banner.result === "ok"){

            return(
              
            response.status(200).json({
                success:true,
                message:"Image deleted  Successfuly from cloudinary"
            })
        
            )

        }
        else{

            return(
            response.status(400).json({
                success:false,
                message:"Delete  Banner cloudinary Failed,please try again"
            })
        )
        }
        
    } catch (error) {
        
        console.log(error);

        return(
            response.status(500).json({
                success:false,
                message:error.message || "Delete  Banner cloudinary Failed"
            })
        )
        
    }
}




module.exports = {AddBanner , GetAllBanners , DeleteBanner , DeleteBannerCloudinary};