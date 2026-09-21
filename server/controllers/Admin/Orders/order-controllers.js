const OrderModel =  require("../../../models/Order");


// Get All orders
const GetAllOrders = async (request , response) => {

    try {

        let orders =[] ;
        let  sellerOrders =[];

        console.log(request.user);
        

        // new Admin & Seller
        if(request?.user?.role === "admin"){

        orders= await OrderModel.find({}).sort({orderDate: -1});
        }
        
        else if(request?.user?.role === "seller"){

        orders = await OrderModel.find({
            "cartItems.sellerId": request?.user.id
        }).sort({orderDate: -1});

        console.log(orders);
        

        // only order items
     sellerOrders = orders.map((order) => {
      const sellerItems = order.cartItems.filter(
        (item) => item.sellerId.toString() === request?.user.id
      );

      return {
        _id: order._id,
        userId: order.userId,
        addressInfo: order.addressInfo,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,

        // Only this seller's products
        cartItems: sellerItems,

        // Calculate seller's total
        totalAmount: sellerItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };
    });


        }

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
                    data: request?.user?.role === "admin"  ? orders : sellerOrders
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
        let checkorders = [] ;
        let  sellerOrders =[];

        // new Admin & Seller
        if(request?.user?.role === "admin"){

        checkorders= await OrderModel.findById({
            _id:orderId,
        });
        }
        
        else if(request?.user?.role === "seller"){

          checkorders= await OrderModel.find({
             _id:orderId,
            "cartItems.sellerId": request?.user.id
        }).sort({orderDate: -1});
            
        sellerOrders = checkorders.map((order) => {
      const sellerItems = order.cartItems.filter(
        (item) => item.sellerId.toString() === request?.user.id
      );

      return {
        _id: order._id,
        userId: order.userId,
        addressInfo: order.addressInfo,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,

        // Only this seller's products
        cartItems: sellerItems,

        // Calculate seller's total
        totalAmount: sellerItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };
    });
        

    

    }


    console.log("--",sellerOrders);
    

     
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
                data:request?.user?.role === "admin"  ? checkorders : sellerOrders[0]
            })
        )
        
    } catch (error) {
        
        console.log(error);
        
        return(
            response.status(500).json({
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

        console.log(error);
        
        return(
            response.status(500).json({
                success:false,
                message:"Update admin Orders status failed"
            })
        )
        
    }
}

module.exports = {GetAllOrders ,GetSingleOrder, UpdateOrderStatus};