const mongoose  = require("mongoose");

const BannerSchema = new mongoose.Schema({

    banner_url: {
        type:String,
        required:[true , "Banner Image is required"],
        trim:true
    },
    publicId:  {
        type:String,
        required:[true , "Banner Image is required"],
        trim:true
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
        
    },
    size: {
        type:Number,
        required:true,
    }
},{
    timestamps:true
});

module.exports = new mongoose.model("Banners", BannerSchema);