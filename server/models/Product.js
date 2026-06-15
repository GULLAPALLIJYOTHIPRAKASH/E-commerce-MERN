const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({

    image: {

        url: {
            type:String,
            required:[true , "image url is required"]
        },
        publicId:{
            type:String,
            required:[true , "image public id is required"]
        }

    },

    title : {
        type:String ,
        required:[true , "product title is required"],
        minLength:[10 , "minimum title should be 10 characters"]
    },
    description: {

        type:String,
        required: [true , "description is required"],
        maxLength:[100 , "description should be max 100 characters"]
    },
    category: {

        type:String,
        required: [true , "category is required"],
    },
    brand: {

        type:String,
        required: [true , "brand is required"],
    },
    price: {
        type:Number,
        required:[true , "price is required"],
        min:[100 ,"price should be min 100" ]
    },
    salePrice: {
        type:Number,
        // required:[true , "salePrice is required"],
        
    },
    totalStock :{
        type:Number,
        required:[true , "totalStock is required"],
        min:[1 ,"totalStock should be min 1" ]
    }, 
    createdBy: {
        type:"String"
    }
},{timestamps: true});


module.exports = new mongoose.model("products" , ProductsSchema);