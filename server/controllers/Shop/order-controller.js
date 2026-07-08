const { image } = require("../../config/cloudinary");
const paypalConfig = require("../../config/paypal");
const OrderModel = require("../../models/Order");

const CreateOrder = async (request , response) => {

    try {
        
        const {
            userId,
            cartItems,
            addressInfo,
            totalAmount,
            orderDate,
            OrderUpdateDate,
            OrderStatus,
            payerId,
            paymentId,
            paymentMethod,
            paymentStatus

        } = request.body;

        if( !userId && !cartItems && !addressInfo && !totalAmount && !orderDate && !OrderUpdateDate && !OrderStatus && !payerId && !paymentId && !paymentMethod && !paymentStatus){

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

                "payment_menthod":"paypal"
            },
            "redirect_urls":{

                return_url: "http://localhost:5173/shop/paypal-return",
                cancel_url: "http://localhost:5173/shop/paypal-cancel"

            },

            "transcations":[{

                items_list: {

                    item: cartItems.map((item) => {

                        return({
                            "sku":item?.productId.toString(),
                            name:item?.title,
                            price:Number(item?.price),
                            quantity:item?.quantity,
                            currency:"USD"
                          
                        })
                    })
                }
            }],

            amount: {

                total:Number(totalAmount).toFixed(2),
                currency:"USD"

            },
            description: "E-commerce orders"
        }


        await paypalConfig.payment.create(create_paypap_json , (error , paymentInfo) => {


            if(error){

                return(
                    response.status(400).json({

                        success:false,
                        message: error.message || "payment failed"
                    })
                )
            }


            // create order
            const newOrder = new  OrderModel({


            userId,
            cartItems,
            addressInfo,
            totalAmount,
            orderDate,
            OrderUpdateDate,
            OrderStatus,
            payerId,
            paymentId,
            paymentMethod,
            paymentStatus

            })
        })

        // save order
        await newOrder.save();

        // get paypal  approval url 
        const approval_url  = paymentInfo?.links?.find((link) => link.rel == "approval_url").href;

        return(
            response.status(201).json({

                success:true,
                message:"Order Placed Successfully",
                approval_url,
                orderId:newOrder?._id

            })
        )

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