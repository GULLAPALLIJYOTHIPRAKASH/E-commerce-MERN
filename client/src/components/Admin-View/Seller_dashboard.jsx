import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { OrderStatus } from "../config/config";

function Seller_dashboard(){

    const {user} = useSelector((state) => state.auth);
    const [OrderData , setOrderData] = useState([]);


    useEffect(() => {

        const fetchOrderSummary = async () => {

           try {
            
             const result = await axios.get("http://localhost:5000/api/admin/dashboard/OrderSummaryDetails" , {
                withCredentials:true
            })

            console.log(result);
            

            

            if(result?.data?.success){

                setOrderData(result?.data?.data);

                
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
           {/* order details */}
           <div className="order-details p-3">
            <div className="heading">
                <h1 className="text-base font-medium">All Order Details Summary</h1>
                <div className="order-cards mt-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[30px] items-start justify-center">
                    
                  {
  OrderStatus?.map((card) => {
    const order = OrderData?.find(
        
      (item) => item
    );

    


    
    return (
      <div
        key={card.value + Math.random(10).toString() }
        className="order-card px-4 py-2 border border-gray-200 shadow-md shadow-black/10 rounded-md"
      >
        <h3 className="text-base capitalize tracking-[1px] mb-1">
          {card.label}
        </h3>

        <h2 className="text-center font-medium">
          {order?.count ?? 0}
        </h2>
      </div>
    );
  })
}
                </div>
            </div>
           </div>
        </div>
    </div>
    </>)
}

export default Seller_dashboard;