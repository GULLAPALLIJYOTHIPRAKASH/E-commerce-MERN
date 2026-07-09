import { useNavigate } from "react-router-dom";

function PaymentSuccess(){

    const navigate = useNavigate();
        return(<>
    <div className="flex justify-center items-center flex-col gap-10">
        
    <p className="text-sm lg:text-lg text-center font-medium mt-10 text-green-500">Order Placed Successfully</p>
    <button  onClick={() => {navigate("/shop/account")}}  className="text-center w-[150px] p-3 bg-black text-white rounded-lg cursor-pointer">Go to orders</button>
    </div>
    </>)
}
export default PaymentSuccess;