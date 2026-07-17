import { useNavigate } from "react-router-dom";

function Paypal_Cancel(){

    const navigate = useNavigate();
    return(<>
     <div className="flex justify-center items-center flex-col gap-10">
        
    <p className="text-center text-sm md:text-lg font-medium mt-10">Payment is Cancel please try again...</p>
    <button  onClick={() => {navigate("/shop/checkout")}}  className="text-center w-[150px] p-3 bg-black text-white rounded-lg cursor-pointer">Go to Checkout</button>
    </div>
    </>)
}

export default Paypal_Cancel;