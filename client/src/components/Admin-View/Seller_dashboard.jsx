import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { OrderStatus } from "../config/config";

function Seller_dashboard(){

    const {user} = useSelector((state) => state.auth);
    const [OrderData , setOrderData] = useState([]);

    const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL


    useEffect(() => {

        const fetchOrderSummary = async () => {

           try {
            
             const result = await axios.get(BackendAPI_URL + "/api/admin/dashboard/OrderSummaryDetails" , {
                withCredentials:true
            })

            console.log(result);
            

            

            if(result?.data?.success){

                setOrderData(result?.data);

                

                
            }
           } catch (error) {
            
            console.log(error);
            
           }

            
            
        }

        fetchOrderSummary();
    },[])
    return(<>
    <div className="seller-container">
        <div className="seller-center  w-[100%] h-auto">

          {/* revenue of the seller */}
          <div className="revenue w-full p-3 mb-2 shadow-sm  border-1 border-gray-100 rounded-lg">
            <h1 className="text-lg font-medium">Total Revenue</h1>
            <h3 className="text-lg pt-1">$ {OrderData?.revenue ?? 0}</h3>
          </div>

           {/* order details */}
           <div className="order-details p-3 shadow-sm  border-1 border-gray-100 rounded-lg">
            <div className="heading">
                <h1 className="text-base font-medium">All Order Details Summary</h1>
                 
                { 
                OrderData?.data?.length  > 0 ?  
                <div className="order-cards mt-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[30px] items-start justify-center">

                { OrderData?.data?.map((item) => {
                return (
                <div
                key={item._id + Math.random(10).toString() }
                className="order-card px-4 py-2 border border-gray-200 shadow-md shadow-black/10 rounded-md"
                >
                <h3 className="text-base capitalize tracking-[1px] mb-1">
                {item._id}
                </h3>

                <h2 className="text-center font-medium">
                {item?.count ?? 0}
                </h2>
                </div>
                );
                }) 
                }</div>:<p className="text-center text-base text-red-600 mt-3">Currently No Orders Available.</p>
                }
            </div>
           </div>
        </div>
    </div>
    </>)
}

export default Seller_dashboard;