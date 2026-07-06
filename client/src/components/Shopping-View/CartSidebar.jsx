import { useNavigate } from "react-router-dom";
import CartItemsCard from "./CartItemsCard";

function CartSidebar({HandleDeleteProductQty , HandleUpdateProductQuantity , cartItems ,showCart , HandleCartSidebar}){

    const totalCart = cartItems && cartItems.length > 0 && cartItems.reduce((acc , item) => {

        
        return(

         acc += (item?.salePrice != null && item?.salePrice > 0 ? item.salePrice :  item.price)* item.quantity
        )
    },0) 


    const navigate = useNavigate();

    
    
    

    return(<>
    <div className={`cart-container w-[100%] h-[100vh] fixed top-0 z-100 bg-black/30 ${showCart ? "-left-0" : "left-[100%]"} transiton-all ease-in-out duration-500 flex justify-end`}>
        <div className="cart-center w-[100%] p-4 sm:w-[50%] lg:w-[30%] h-[100%] overflow-y-auto scrollbar-thin bg-white">
            <div className="heading  flex justify-between items-center">
                <h1 className="text-base font-bold">Your Cart</h1>
                <i onClick={HandleCartSidebar} className="text-xl text-red-500 cursor-pointer fa-solid fa-xmark"></i>
            </div>
            {/* Cart Items */}
            {
            
            cartItems && cartItems?.length > 0 ? 
            <CartItemsCard cartItems={cartItems} HandleUpdateProductQuantity={HandleUpdateProductQuantity} HandleDeleteProductQty={HandleDeleteProductQty} /> :

            <p className="text-base font-normal text-center my-5">Your Cart is empty </p>
            }

            <div className="total-cart-price mt-2">

                <div className="cart-total flex justify-between items-center">
                    <h1 className="text-base font-bold ">Total</h1>
                    <h1 className="text-base font-bold ">${totalCart || 0}</h1>
                </div>
                <button disabled={ cartItems?.length == 0 ? true : false}  onClick={() => {navigate('/shop/checkout'); HandleCartSidebar(); }} className="button w-[100%] bg-black text-white text-center py-2 rounded-lg mt-3 cursor-pointer hover:opacity-70 transition-all linear duration-300">Check out</button>
            </div>
            
        </div>
    </div>
    </>)
}

export default CartSidebar;