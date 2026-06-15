const cloudinary = require("../config/cloudinary");

const UploadToCloudinary = async(filepath) => {

    try {

        const result = await cloudinary.uploader.upload(filepath , {
            folder:"E-Commerces"
        })

        return result;
        
    } catch (error) {
        
        console.log("Uplaod Cloudinary Error: ",error);

        // re throw error
        throw error;
        
    }
}

module.exports = UploadToCloudinary;