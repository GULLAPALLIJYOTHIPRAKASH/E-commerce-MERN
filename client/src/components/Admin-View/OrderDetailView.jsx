import { OrderStatus } from "../config/config";
import { BgStatus } from "./AdminOrders";

function OrderDetailView({SubmitOrderStatus , setOrderStatus , orderStatus,orderDetails , showOrderDetail, HanldeOrderDetails}){

    console.log(orderDetails?._id);
    

    return(<>
     <div className={`order-details-view-container w-[100%] h-[100%] fixed top-0 left-0 ${showOrderDetail ? 'left-[0]' : 'left-[100%]'} bg-gray-500/10 z-100 transition-all linear duration-300 flex justify-center items-center`}>
           <div className="details-center w-[100%] p-3 max-w-[650px] max-h-[500px] mx-[20px] scrollbar-thin overflow-y-auto bg-white rounded-lg">
               <div onClick={HanldeOrderDetails} className="close-btn text-right mb-3">
                   <i className="text-lg cursor-pointer fa-solid fa-xmark"></i>
               </div>
               {/* order details */}
               <div className="order-info border-b-1 pb-2 mb-2">
                   {/* Order Id */}
                   <div className="field mb-1 flex justify-between items-center ">
                       <h1 className="text-sm font-medium text-gray-500">Order Id</h1>
                       <h3 className="text-sm font-medium text-black">{orderDetails?._id}</h3>
                   </div>
                    <div className="field mb-1 flex justify-between items-center">
                       <h1 className="text-sm font-medium text-gray-500">Ord Date</h1>
                       <h3 className="text-sm font-medium text-black">{new Date(orderDetails?.orderDate).toLocaleDateString()}</h3>
                   </div>
                   <div className="field mb-1 flex justify-between items-center">
                       <h1 className="text-sm font-medium text-gray-500">Payment Method</h1>
                       <h3 className="text-sm font-medium text-black capitalize">{orderDetails?.paymentMethod}</h3>
                   </div>
                   <div className="field mb-1 flex justify-between items-center">
                       <h1 className="text-sm font-medium text-gray-500">Payment Status</h1>
                       <h3 className="text-sm font-medium text-black capitalize">{orderDetails?.paymentStatus}</h3>
                   </div>
                    <div className="field mb-1 flex justify-between items-center">
                       <h1 className="text-sm font-medium text-gray-500">Price</h1>
                       <h3 className="text-sm font-medium text-black">${orderDetails?.totalAmount}</h3>
                   </div>
                    <div className="field mb-1 flex justify-between items-center">
                       <h1 className="text-sm font-medium text-gray-500">Status</h1>
                       <h3 className="text-[12px] font-medium text-white capitalize"><span className={`${BgStatus(`${orderDetails?.orderStatus}`)} py-1 px-2 rounded-lg capitalize`}>{orderDetails?.orderStatus}</span></h3>
                   </div>
                   
   
               </div>
   
               {/* product details */}
               <div className="products-info border-b-1 pb-2 mb-2">
                   <h1 className="text-sm font-medium my-1">Product Details</h1>
                   {
                       orderDetails && orderDetails?.cartItems?.length > 0 &&  orderDetails?.cartItems?.map((item) => {
   
                           return(<div key={item?._id} className="field mb-1 flex justify-between items-center ">
                       <h1 className="text-[12px] font-medium text-gray-500 line-clamp-1">{item?.title} x {item?.quantity}</h1>
                       <h3 className="text-[12px] font-medium text-black">${ (item?.price) * item?.quantity}</h3>
                   </div>)
                       })
                   }
                   
                   
   
               </div>
               {/* order Address */}
               <div className="details-info ">
                   <h1 className="text-sm font-medium my-1">Address</h1>
                   <h1 className="text-sm font-medium text-gray-500 my-1">Test</h1>
   
                   {/* Order Id */}
                   <div className="field mb-1 flex">
                       <h1 className="text-sm  text-gray-500">Address: </h1>
                       <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">{orderDetails?.addressInfo?.address}</h3>
                   </div>
                   <div className="field mb-1 flex">
                       <h1 className="text-sm font-medium text-gray-500">City: </h1>
                       <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">{orderDetails?.addressInfo?.city}</h3>
                   </div>
                   <div className="field mb-1 flex">
                       <h1 className="text-sm font-medium text-gray-500">Pincode: </h1>
                       <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">{orderDetails?.addressInfo?.pincode}</h3>
                   </div>
                   <div className="field mb-1 flex">
                       <h1 className="text-sm font-medium text-gray-500">Phone: </h1>
                       <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">{orderDetails?.addressInfo?.phone}</h3>
                   </div>
                     <div className="field mb-1 flex">
                       <h1 className="text-sm font-medium text-gray-500">Notes: </h1>
                       <h3 className="text-[13px]  text-black line-clamp-1 ml-[1px]">{orderDetails?.addressInfo?.notes}</h3>
                   </div>
                  

            </div>
            <div className="field">
                <label className="block text-base  font-medium mb-1">Order Status:</label>
                <select  onChange={(e) => {setOrderStatus(e.target.value)}} value={orderStatus} className="w-[100%] outline-none border-2 border-gray-200 rounded-md py-2">
                    {OrderStatus.map((item) => {

                        return(
                            <option key={item.label} value={item.id}>{item.label}</option>
                        )
                    })}
                </select>
            </div>

            <button  onClick={() => {SubmitOrderStatus(orderDetails?._id)}} className="w-[100%] p-2 bg-black text-white text-center rounded-lg mt-2 cursor-pointer">Update Status</button>
        </div>
    </div>
    </>)
}

export default OrderDetailView;