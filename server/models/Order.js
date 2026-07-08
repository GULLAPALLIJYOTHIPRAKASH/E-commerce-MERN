const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({

    userId:String,
    cartId:String,
    cartItems: [

        {
            productId:String,
            image: {

                url:String,
                publicId:String
            },
            title:String,
            price:Number,
            quantity:Number

        }
    ],
    addressInfo: {

        addressId:String,
        address:String,
        city:String,
        pincode:String,
        phone:String,
        notes:String,
    },
    totalAmount:Number,
    orderDate:Date,
    orderStatus:String,
    orderUpdateDate:Date,
    paymentId:String,
    payerId:String,
    paymentStatus:String,
    paymentMethod:String

});

module.exports = new mongoose.model("orders" ,OrderSchema);