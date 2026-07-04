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

        const userId = request.params.userId;


        if(!userId){

            return(
                response.status(400).json({
                    success:false,
                    message:"UserId is missing."
                })
            )
        }


        // check cart with userId
        const checkCart = await CartModel.findOne({userId}).populate({
            path:"items.productId",
            select:"title  image  price  salePrice "
        });


        if(!checkCart){

            return(
                response.status(404).json({

                    success:false,
                    message:"Cart is Empty,please add items"
                })
            )
        }


        // check actuall product  from cart
        const validCart = checkCart.items.filter((item) => item.productId);

        // console.log(validCart);

        // if any item in cart is delete from products db
        if(checkCart.length > validCart.length){

            checkCart.items = validCart;

            // save to cart DB
            await checkCart.save();
        }




        const populatedCart = validCart?.map((item) => {

            return{

                productId:item?.productId?._id,
                image:item?.productId?.image,
                title:item?.productId?.title,
                price:item?.productId?.price,
                salePrice:item?.productId?.salePrice,
                quantity:item?.quantity

            }
        })

       ;
        


        return(
            response.status(200).json({
            success:true,
            message:"Cart is Available",
            data:{

            ...checkCart._doc,
            items:populatedCart
        }
        }))


        

        
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
        
        const {userId , productId , quantity} = request.body;

        if(!userId && !productId && quantity <= 0){

            return(
                response.status(400).json({
                    success:false,
                    message:"Invalid data"
                })
            )
        }

        // check cart
        const cart = await CartModel.findOne({userId});




        if(!cart){

            return(
                response.status(404).json({
                    success:false,
                    message:"No Cart Available"
                })
            )
        }


        


        // find product for update quantity
        let findProductIndex =cart?.items.findIndex((item) => item.productId.toString() === productId);

        

        if(findProductIndex === -1){

             return(
                response.status(404).json({
                    success:false,
                    message:"product not found in the cart"
                })
            )
        }

        
        
        
        // update quantity
        cart.items[findProductIndex].quantity = quantity;
        
        // save in db
        await cart.save();
        
        await cart.populate({
            path:"items.productId",
            select:"title image price salePrice"
        })
        
        
        console.log(cart);

        // populate all 
        const populateProduct = cart?.items?.map((item) => {

            return({
                productId: item?.productId ? item.productId?._id : null,
                title : item?.productId ? item.productId?.title : null,
                image : item?.productId ? item.productId?.image : null,
                price : item?.productId ? item.productId?.price : null,
                salePrice : item?.productId ? item.productId?.SalePrice : null,
                quantity:item?.quantity
            })
        })

        return(

            response.status(200).json({
                success:true,
                message:"Product quantity Updated Successfully",
                data:{

                    ...cart._doc,
                    items:populateProduct
                }
            })

        )

        
        

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
        console.log(
            request.params

        );

        const {userId , productId} = request.params;

        

        if(!userId && !productId){

            return(
                response.status(400).json({
                    success:false,
                    message:"Invalid Data"
                })
            )
        }

        const cart = await CartModel.findOne({userId});

        if(!cart){

            return(
                response.status(404).json({

                    success:false,
                    message:"No Cart available"
                })
            )
        }


        // remove productId from cart then return 
        const filterCart = cart.items.filter((item) => item.productId.toString() !== productId);


        // update cart Items removed the productId
        cart.items = filterCart;

        // save in DB
        await cart.save();

        await cart.populate({
            path:"items.productId",
            select:"title image price salePrice"
        })

        const populateCart = cart.items.map((item) => {

            return({

                productId:item?.productId ? item.productId._id  : null,
                title:item?.productId ? item.productId.title  : null,
                image:item?.productId ? item.productId.image  : null,
                price:item?.productId ? item.productId.price  : null,
                salePrice:item?.productId ? item.productId.salePrice  : null,
                quantity: item.quantity
            })
        })

        return(

            response.status(200).json({
                success:true,
                message:"Product removed from cart",
                data:{
                    ...cart._doc,
                    items:populateCart
                }
            })
        )
        
    } catch (error) {
        

        return(
            response.status(400).json({

                success:false ,
                message: error.message  || "Delete CartItems  failed"
            })
        )
    }
}


module.exports = { AddToCart , GetAllCartItems , UpdateCart , DeleteCart}