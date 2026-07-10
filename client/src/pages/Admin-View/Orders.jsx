import { useEffect, useState } from "react";
import AdminOrders from "../../components/Admin-View/AdminOrders";
import OrderDetailView from "../../components/Admin-View/OrderDetailView";
import { AdminOrderDetails, AdminOrdersList, AdminUpdateOrderStatus, reset_order_details } from "../../redux/Admin/order-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Orders(){

    const [showOrderDetail , setShowOrderDetail] =useState(false);

    const [orderStatus , setOrderStatus] = useState("");

    // user redux
    const {user} = useSelector((state) => state.auth);

    // order redux
    const {ordersList, orderDetails} = useSelector((state) => state.AdminOrder);
    const dispatch = useDispatch();

    // show/hide order detail
    const HanldeOrderDetails = async (orderId="") =>{

        // set T/F
        setShowOrderDetail(!showOrderDetail);

        if(!showOrderDetail){

            const response = await dispatch(AdminOrderDetails(orderId)).unwrap()

            
            if(response?.success){

                // update order status
                setOrderStatus(response?.data?.orderStatus)
            }

            
        }else{
            
            
            // reset order detail state
            dispatch(reset_order_details());

            setOrderStatus("");

            // refetch new data
            dispatch(AdminOrdersList())



        }
        

    }


    // update Order Status
    const SubmitOrderStatus = async (orderId) => {

        try {
            
            
            const response = await dispatch(AdminUpdateOrderStatus({orderId:orderId, orderStatus:orderStatus})).unwrap();

            console.log(response);

            if(response.success){

                // 
                setOrderStatus(response.data.orderStatus);

                toast.success("Order Status Successfuly", {
                    toastId:"OrderStatus"
                })

            }
            

        } catch (error) {

            console.log(error.message);
            
            
        }
    }



   
       // fetch all orders
       useEffect(() => {
   
        dispatch(AdminOrdersList())

        
   
       },[dispatch])

       

       


       

    return(<>
    <div className="admin-orders-container">
        <div className="admin-orders-center">
            <h1 className="text-base lg:text-lg font-medium">Orders List</h1>

            <AdminOrders ordersList={ordersList} HanldeOrderDetails={HanldeOrderDetails}/>
        </div>
    </div>

    {/* Order detail view */}
    <OrderDetailView SubmitOrderStatus={SubmitOrderStatus} orderStatus={orderStatus} setOrderStatus={setOrderStatus} orderDetails={orderDetails}  showOrderDetail={showOrderDetail} HanldeOrderDetails={HanldeOrderDetails}/>
    </>)
}

export default Orders;