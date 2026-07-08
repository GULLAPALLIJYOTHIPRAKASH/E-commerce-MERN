import { useState } from "react";
import AdminOrders from "../../components/Admin-View/AdminOrders";
import OrderDetailView from "../../components/Admin-View/OrderDetailView";

function Orders(){

        const [showOrderDetail , setShowOrderDetail] =useState(false);
    
    // show/hide order detail
    const HanldeOrderDetails = () =>{

        console.log(showOrderDetail);
        

        setShowOrderDetail(!showOrderDetail);
    }

    return(<>
    <div className="admin-orders-container">
        <div className="admin-orders-center">
            <h1 className="text-base lg:text-lg font-medium">Orders List</h1>

            <AdminOrders HanldeOrderDetails={HanldeOrderDetails}/>
        </div>
    </div>

    {/* Order detail view */}
    <OrderDetailView showOrderDetail={showOrderDetail} HanldeOrderDetails={HanldeOrderDetails}/>
    </>)
}

export default Orders;