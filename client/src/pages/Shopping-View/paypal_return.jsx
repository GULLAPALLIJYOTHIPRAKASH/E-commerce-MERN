import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ShopCaptureOrder } from "../../redux/Shop/order-slice";

function Paypal_Return(){

    const dispatch = useDispatch();
    const location = useLocation();

    // get url  queyr search
    const params = new URLSearchParams(location.search);
    const payerId = params.get("PayerID");
    const paymentId = params.get("paymentId");

    const navigate = useNavigate();


    const ShopCapturePayment = async () => {

        if(payerId && paymentId){

            // orderId from store
            const orderId = JSON.parse(sessionStorage.getItem("orderId"));

            
            const formData = {
                orderId, payerId ,paymentId
            }

            const response = await dispatch(ShopCaptureOrder(formData)).unwrap();

            console.log(response);
            
            if(response.success){

                // clear store orderId
                sessionStorage.removeItem("orderId");

                // move to payment success page
                navigate("/shop/payment-success" , {replace:true});
            }
        }
    }


    useEffect(() => {

        ShopCapturePayment();
    },[payerId , paymentId , dispatch])
    

    return(<>
    
    <p className="text-center text-sm md:text-lg font-medium mt-10">please await payment is processing.....</p>
    </>)
}

export default Paypal_Return;