const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema({

    userId:{

        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true

    },
    items:[

        {
            productId:{

                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
                required:true
            },

            quantity: {

                type:Number,
                required: true,
                min:1
            },
            // seller & admin
            sellerId:String,
        }
    ]
},{timestamps:true});

module.exports = new mongoose.model("cart" , CartSchema);