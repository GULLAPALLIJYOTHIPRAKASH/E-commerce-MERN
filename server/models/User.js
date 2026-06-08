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
        enum:["user" , "admin"],
        default:"user"
    }
},{timestamps:true});

module.exports = new mongoose.model("users" , userSchema);