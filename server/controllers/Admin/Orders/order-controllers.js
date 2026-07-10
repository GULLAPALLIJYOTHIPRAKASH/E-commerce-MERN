const OrderModel =  require("../../../models/Order");


// Get All orders
const GetAllOrders = async (request , response) => {

    try {

        const orders = await OrderModel.find({});

        if(orders.length === 0){

            return(
                response.status(404).json({
                    success:false,
                    message:"No orders found"
                })
            )
        }

        return(
            response.status(200).json({
                    success:true,
                    message:"orders found",
                    data:orders
                })
            )
        
    } catch (error) {

        return(
            response.status(500).json({
                success:false,
                message:"Admin Orders list failed"
            })
        )
        
    }
}


// get single order
const GetSingleOrder = async (request , response) => {

    try {

        const {orderId} = request.params;


        if(!orderId){

            return(
                response.status(400).json({
                    success:false,
                    message:"orderId is missing"
                })
            )
        }

        // check orders
        const checkorders = await OrderModel.findOne({_id:orderId});


     
        if(!checkorders){

            return(
                response.status(404).json({
                    success:false,
                    message:"Order is not found"
                })
            )
        }

        return(
            response.status(200).json({
                success:true,
                message:"Order Details",
                data:checkorders
            })
        )
        
    } catch (error) {
        
        return(
            response.status(400).json({
                success:false,
                message:error.message || "Get Single Order failed"
            })
        )
    }
}

// Update order status
const UpdateOrderStatus= async (request , response) => {

    try {
        const {orderStatus} = request.body;

        const {orderId} = request.params;

        if( !orderId || !orderStatus){

            return(

                response.status(400).json({
                    success:false,
                    message:" orderId or orderStatus is missing."
                })
            )
        }

        // find order
        const checkOrder = await OrderModel.findOne({_id:orderId});

        if(!checkOrder){

            return(
                response.status(404).json({
                    success:false,
                    message:"Order is not found"
                })
            )
        }


        // update
        checkOrder.orderStatus = orderStatus

        await checkOrder.save();

        return(
            response.status(200).json({
                success:true,
                message:"Order Details",
                data:checkOrder
            })
        )
    } catch (error) {

        return(
            response.status(500).json({
                success:false,
                message:"Update admin Orders status failed"
            })
        )
        
    }
}

module.exports = {GetAllOrders ,GetSingleOrder, UpdateOrderStatus};