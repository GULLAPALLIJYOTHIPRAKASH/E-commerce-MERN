import { useEffect, useState } from "react";
import checkoutBanner from "../../assets/checkout.jpg";
import { useDispatch, useSelector} from "react-redux";
import { ShopGetAllAddress } from "../../redux/Shop/address-slice";
import AddressCard from "../../components/Shopping-View/AddressCard";
import { Link } from "react-router-dom";
import { ShopDeleteCart, ShopGetAllCartItems, ShopUpdateCart } from "../../redux/Shop/cart-slice";
import CartItemsCard from "../../components/Shopping-View/CartItemsCard";
import { toast } from "react-toastify";
function Checkout(){

    const dispatch = useDispatch();

    // address redux
    const {addressList} = useSelector((state) => state.ShopAddress);

    // user redux
    const{user} =useSelector((state) => state.auth);

    const [deliveryAddress , setDeliveryAddress] = useState("");

      // cart redux
    const{cartItems} = useSelector((state) => state.ShopCart);

    // product redux 
    const {productsList} = useSelector((state) => state.ShopProduct)




    // Handle Delivery address
    const HandleDeliveryAddress = (id) =>{

        const getaddress = addressList?.find((item)=> item?._id.toString() === id);

        console.log(id , getaddress);
        

        setDeliveryAddress(getaddress)

    }





    // fetch all address
        useEffect(() =>{
    
            dispatch(ShopGetAllAddress({userId:user?.id}))
        },[dispatch]);



    // fetch all cart items 
    useEffect(() => {

            
            dispatch(ShopGetAllCartItems(user?.id))
        
    },[dispatch])


    // Update Product Quantity 
    const HandleUpdateProductQuantity = async (productId , quantity, ActionType) => {

    const getCart = cartItems.items || [];


    if(ActionType === "plus"){


    if(getCart.length > 0){

        // get current product
        const findProductIndex  = getCart.findIndex((item) => item.productId.toString() === productId);

        console.log(findProductIndex);
        

        if(findProductIndex > -1){

            const currentProductQuantity = getCart[findProductIndex].quantity ;

            console.log(currentProductQuantity);
            
            const stock = productsList?.find((item) => item._id == productId)?.totalStock
            

            if(currentProductQuantity + 1 > stock){

                toast.warn(`Only ${stock} items can be added to cart`, {

                    toastId:"stockCart"
                });

                return ;
            }

        }
    }

    }


    try {
        
        const response = await dispatch(ShopUpdateCart({userId:user?.id, productId , quantity})).unwrap();


        if(response.success){

            toast.success(`Product quantity updated Successfully`,
                {
                    toastId:"UpdateQty",
                }
            )
        }
    } catch (error) {

        console.log(error);
        
        
    }

    }


    // Delete product from Cart
    const HandleDeleteProductQty = async (productId) => {

        try {

            console.log({userId:user?.id , productId});
            
            
            const response = await dispatch(ShopDeleteCart({userId:user?.id , productId})).unwrap();


            if(response.success){

                toast.error("Product removed from cart",{
                    toastId:"DeleteCart"
                })
            }

        } catch (error) {
            
            console.log(error);
            
        }
    }


    // total Cart
     const totalCart = cartItems && cartItems?.items?.length > 0 && cartItems?.items?.reduce((acc , item) => {

        
        return(

         acc += (item?.salePrice != null && item?.salePrice > 0 ? item.salePrice :  item.price)* item.quantity
        )
    },0) 




      

    return(<>
    <div className="checkout-container">
        <div className="checkout-center">
            <div className="img-container w-[100%] h-auto lg:h-[350px] overflow-hidden object-center object-cover">
                <img className="w-[100%] h-[100%]  overflow-hidden object-center object-cover" src={checkoutBanner} alt="" />
            </div>
            
            {/* Address list */}
            <div className="address-section m-3   border-1 border-gray-300 rounded-md p-4">
        <h1 className="text-base font-normal">Address List</h1>
        {/* address card */}
       {addressList && addressList.length > 0 ? <AddressCard HandleDeliveryAddress={HandleDeliveryAddress}  addressList={addressList}/> : <p className="text-[12px] md:text-lg font-normal text-center mt-5 p-2 text-black">Please add your delivery address at under <Link className="underline underline-offset-3" to="/shop/account">Accounts</Link> page </p>}
        </div>

        {/* cart Items */}
        <div className="cartItems p-4">
            {
                
                
                cartItems && cartItems.items?.length > 0 ? 
                <CartItemsCard cartItems={cartItems.items} HandleUpdateProductQuantity={HandleUpdateProductQuantity} HandleDeleteProductQty={HandleDeleteProductQty} /> :
                
                <p className="text-base font-normal text-center my-5">Your Cart is empty </p>
            }

              <div className="total-cart-price mt-2 border-t-2 pt-1">

                <div className="cart-total flex justify-between items-center">
                    <h1 className="text-base font-bold ">Total</h1>
                    <h1 className="text-base font-bold ">${totalCart || 0}</h1>
                </div>
                <button disabled={cartItems?.items?.length  == 0 ? true :false}  className="button w-[100%] bg-black text-white text-center py-2 rounded-lg mt-3 cursor-pointer hover:opacity-70 transition-all linear duration-300">Checkout with PayPal</button>
            </div>


            
            </div>
        </div>
    </div>
    </>)
}
export default Checkout;