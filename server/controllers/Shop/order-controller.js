const { image } = require("../../config/cloudinary");
const paypalConfig = require("../../config/paypal");
const OrderModel = require("../../models/Order");
const ProductModel = require("../../models/Product");
const CartModel = require("../../models/Cart");

const CreateOrder = async (request , response) => {

    try {
        
        const {
            userId,
            cartId,
            cartItems,
            addressInfo,
            totalAmount,
            orderDate,
            orderUpdateDate,
            orderStatus,
            payerId,
            paymentId,
            paymentMethod,
            paymentStatus

        } = request.body;

        if( !userId ||!cartItems || !cartId || !addressInfo ||!totalAmount ||!orderDate ||!orderUpdateDate ||!orderStatus ||!paymentMethod ||!paymentStatus){

            return(
                response.status(400).json({
                    success:false,
                    message:"Invalid Data"
                })
            )
        }


        // create paypal json
        const create_paypap_json= {
            "intent":"sale",
            "payer":{

                "payment_method":"paypal"
            },
            "redirect_urls":{

                return_url: "http://localhost:5173/shop/paypal-return",
                cancel_url: "http://localhost:5173/shop/paypal-cancel"

            },

            "transactions":[{

                item_list: {

                    items: cartItems.map((item) => {

                        return({
                            "sku":item?.productId.toString(),
                            name:item?.title,
                            price:Number(item?.price),
                            quantity:item?.quantity,
                            currency:"USD"
                          
                        })
                    })
                }, 
                amount: {

                total:Number(totalAmount).toFixed(2),
                currency:"USD"

            },
            description: "E-commerce orders"
            }],

          
        }


        await paypalConfig.payment.create(create_paypap_json , async (error , paymentInfo) => {

            if(error){

                return(
                    response.status(500).json({

                        success:false,
                        message: error.message || "payment failed"
                    })
                )
            }


            // create order
            const newcreateOrder = new  OrderModel({


            userId,
            cartId,
            cartItems,
            addressInfo,
            totalAmount,
            orderDate,
            orderUpdateDate,
            orderStatus,
            payerId,
            paymentId,
            paymentMethod,
            paymentStatus

            })

               // save order
        await newcreateOrder.save();

        

        // get paypal  approval url 
        const approval_url  = paymentInfo?.links?.find((link) => link.rel == "approval_url").href;

        return(
            response.status(201).json({

                success:true,
                message:"Order Placed Successfully",
                approval_url,
                orderId:newcreateOrder?._id

            })
        )
        })

     

    } catch (error) {
        
        return(
            response.status(400).json({
                success:false,
                message:error.message || "Create Order failed"
            })
        )
    }
}


const CaptureOrder = async (request , response) => {

    try {

        const {orderId , payerId ,paymentId} = request.body;

        if(!orderId || !payerId || !paymentId){

            return(
                response.status(400).json({
                    success:false,
                    message:"Invalid Data"
                })
            )
        }

        // 1st check order is create or not
        const checkOrder = await OrderModel.findOne({_id:orderId});


        if(!checkOrder){

            return(
                response.status(404).json({
                    success:false,
                    message:"Order not found"
                })
            )
        }

        // update order 
        checkOrder.payerId=payerId;
        checkOrder.paymentId=paymentId;
        checkOrder.paymentStatus="paid";
        checkOrder.orderStatus="confirmed";

        // reduce stock
        for(let item of checkOrder?.cartItems){

            // find ordered product with product db
            const product = await ProductModel.findById(item?.productId);

            if(!product){

                return(response.status(404).json({
                    success:false,
                    message:"Product not found to reduce quantity"
                }))
            }


            // reduce 
            product.totalStock -=item?.quantity;

            // db in products
            await product.save();

        }


        // delete cart from that user account
        await CartModel.findByIdAndDelete(checkOrder?.cartId?.toString());

        // save order
        await checkOrder.save();

        console.log(checkOrder);
        

        return(response.status(201).json({
            success:true,
            message:"Order Placed Successfully",
            data:checkOrder
        }))
        
    } catch (error) {
        
        return(
            response.status(400).json({
                success:false,
                message:error.message || "Capture Order failed"
            })
        )
    }
}


const GetAllOrders = async (request , response) => {

    try {
        
    } catch (error) {
        
        return(
            response.status(400).json({
                success:false,
                message:error.message || "Get all Orders failed"
            })
        )
    }
}


const GetSingleOrder = async (request , response) => {

    try {
        
    } catch (error) {
        
        return(
            response.status(400).json({
                success:false,
                message:error.message || "Get Single Order failed"
            })
        )
    }
}

module.exports = { CreateOrder , CaptureOrder , GetAllOrders , GetSingleOrder}