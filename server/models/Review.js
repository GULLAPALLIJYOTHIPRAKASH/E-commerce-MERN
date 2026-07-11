const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({

    productId:String,
    userId:String,
    username:String,
    reviewMessage:String,
    reviewValue:String
}, {timestamps:true});

module.exports = new mongoose.model("reviews" ,ReviewSchema);