const mongoose= require("mongoose");


const AddressSchema = new mongoose.Schema({

    address:{
        type: String,
        required:[true , "address is required"],
        trim:true
    },
    city:{
        type:String,
        required:[true , "city is required"],
        trim:true
    },
    pincode:{
        type:String,
        required:[true , "pincode is required"],
        trim:true
    },
    phone:{
        type: String,
        required:[true , "phone is required"],
        trim:true,
        minLength:10,
        maxLength:10 
    },
    notes:{
        type: String,
        required:[true , "notes is required"],
        trim:true,
        maxLength:[100 , "notes can't be more than 100"]
    },

    userId:{
    
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
},{timestamps:true});


module.exports = new mongoose.model("address" , AddressSchema);