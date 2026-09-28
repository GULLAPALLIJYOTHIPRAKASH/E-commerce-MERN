const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    username:{

        type:String,
        required:[true , "username is required"],
        trim:true,
        minLength:[3 , "username should be min 3 letters"],
        unique:true
    },
    email:{

        type:String,
        required:[true , "email is required"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true , "password is required"],
        minLength:[9 , "password should be min 9 letters"]
    },
    role: {
        type:String,
        enum:["user" , "seller", "admin"],
        default:"user"
    },

    verify_email:{

        type:Boolean,
        required:[true , "please verify your email"],
        default:false
    },

    otp:{
        type:String,
        trim:true,
        minLength:[6 , 'min 6 digits only'],
        maxLength:[6, 'max 6 digits only']

    },

    verification_code_expiry:  Date

    
},{timestamps:true});

module.exports = new mongoose.model("users" , userSchema);