const CartModel = require("../../models/Cart");
const ProductModel = require("../../models/Product");


// Add to Cart
const AddToCart = async (request , response) => {

    try {
        
        const {userId , productId , quantity} = request.body;

        console.log({userId , productId , quantity});
        


        if(userId == null && productId == null  && quantity <=0){

            return(
                response.status(400).json({

                    success:false,
                    message:"userId , productdId , quantity is required"
                })
            )
        }


    // 1st check the product is available
    const product = await ProductModel.findById(productId);


    if(!product){

        return(
            response.status(404).json({

                success:false,
                message:"Product is not available to add to cart"
            })
        )
    }


    // check cart is exist with userId
    let checkCart = await CartModel.findOne({userId});

    if(!checkCart){

        checkCart = new CartModel({userId , items:[]})

    }


    // find current product is available in cart or not
    const checkCurrentProductId =checkCart.items.findIndex((item) => item.productId.toString() === productId);


    if(checkCurrentProductId === -1){

        // new product add to cart
        checkCart.items.push({productId , quantity});
    }else{


        checkCart.items[checkCurrentProductId].quantity +=quantity;
    }

       


        // save in DB
        await checkCart.save();
        


        if(checkCart){


            return(

                response.status(201).json({

                    success:true,
                    message:"Item added to the cart"
                })
            )

        }else{


            response.status(400).json({

                success:false,
                message:"Add to cart failed,please try again"
            })
        }




    } catch (error) {
        

        return(
            response.status(500).json({

                success:false,
                message: error.message || "Add To cart product failed"
            })
        )
    }
} 


// Get All Cart items
const GetAllCartItems =  async (request , response) => {

    try {
        
    } catch (error) {
        

        return(
            response.status(400).json({

                success:false,
                message: error.message || "Get All CartItems  failed"
            })
        )
    }
}



// Update Cart
const UpdateCart =   async (request , response) => {

    try {
        
    } catch (error) {
        

        return(
            response.status(400).json({

                success:false,
                message: error.message || "Update CartItems  failed"
            })
        )
    }
}



// delete cartItems
const DeleteCart =  async (request , response) => {

    try {
        
    } catch (error) {
        

        return(
            response.status(400).json({

                success:false,
                message: error.message || "Delete CartItems  failed"
            })
        )
    }
}


module.exports = { AddToCart , GetAllCartItems , UpdateCart , DeleteCart}