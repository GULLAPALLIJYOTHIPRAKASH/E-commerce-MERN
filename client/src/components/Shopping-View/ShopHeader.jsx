import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ShopNavLinks } from "../config/config";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { LogoutUser } from "../../redux/auth-slice";
import {toast } from "react-toastify";
import ShopMobileSidebar from "./ShopMobileSidebar";
import CartSidebar from "./CartSidebar";
import { ShopDeleteCart, ShopGetAllCartItems, ShopUpdateCart } from "../../redux/Shop/cart-slice";

function ShopHeader(){


    const[showProfile , setShowProfile]=useState(false);
    const[showSidebar , setShowSidebar]=useState(false);
    // user redux
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const[showCart , setShowCart] =useState(false);

    // cart redux
    const{cartItems} = useSelector((state) => state.ShopCart);

    // product redux 
    const {productsList} = useSelector((state) => state.ShopProduct)




    // Show/Hide Profile
    const HandleShowProfile = ()=> {

        setShowProfile(!showProfile);
    }

    // Handle User logout
    const HandleUserLogout = async () =>{

        try {
            
            const response = await dispatch(LogoutUser()).unwrap();
            
            if(response?.success){

                toast(response.message , {
                    toastId:"Logoutuser"
                })
            }
        } catch (error) {
            
            console.log("user logout error:", error);
            
        }
    }


    // Show/hide  mobile sidebar
    const HandleShowSidebar = ()=> {

        
        setShowSidebar(!showSidebar);
    }



    const[searchParams , setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Handle Navigate filters 
    const HandleNavigateFilters = (item) => {

        
        
        
        // clear storage
        localStorage.removeItem("filters");


        let filters = item.id != "home" && item.id !="search" && item.id != "shop" ? 
        {
            "category":[item.id]

        }: null;

        

        localStorage.setItem("filters" , JSON.stringify(filters));



        // check from location shop/products
        // then generate url query
        // then update to filter & search url

        location.pathname.includes("/shop/products") && filters != null ? setSearchParams(new URLSearchParams(`?category=${filters?.category}`)): navigate(item?.url);

        // scroll top
        window.scrollTo(0,0);



    }



    // show/hide cart Sidebar
    const HandleCartSidebar=() => {

        
        setShowCart(!showCart);

        
    }


    // fetch all cart items 
    useEffect(() => {

        if(showCart){
            
            dispatch(ShopGetAllCartItems(user?.id))
        }
    },[dispatch,showCart])


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

  




    
    

    return(<>
    {/* Navbar start */}
     <nav className="navbar-container w-[100%] min-h-[50px]  bg-white border-b-1 border-gray-300 shadow-sm sticky top-0 left-0 z-50">
            <div className="navbar-center relative w-[100%] h-[100%] p-4 flex justify-between items-center ">
                <div className="logo-section">
                    <Link to="/shop/home" className="text-xl font-bold outline-none">
                        <i className="text-2xl font-semibold fa-brands fa-airbnb"></i>
                        <span className="text-xl font-semibold tracking-[1px] ml-[4px]">Ecommerce</span>
                    </Link>
                </div>

                {/* Hambergur */}
                <div onClick={HandleShowSidebar} className="lg:hidden hamburger border-2 border-gray-300 py-2 px-3">
                    <i className="text-2xl font-bold fa-solid fa-bars"></i>
                </div>

                {/* desktop nav links */}
                <div className="nav-links-main hidden lg:block">
                    <ul className="nav-links flex space-x-4 items-center justify-center">
                        {
                            ShopNavLinks.map((item) => {

                                return(

                                 <li onClick={() => HandleNavigateFilters(item)} className="font-medium text-base transition-all linear duration-100 hover:text-gray-500" key={item.id+"desktop"}><Link to={item.url}>{item.label}</Link></li>
                                )
                            })
                        }
                     
                    </ul>
                </div>

                {/* desktop cart-profile */}
                <div className="cart-profile hidden  lg:block lg:flex lg:gap-6 lg:justify-between lg:items-center ">
                    <div onClick={HandleCartSidebar} className="cart-icon relative border-2 border-gray-200 rounded-lg text-center py-1 px-2 cursor-pointer">
                        <i className="text-base fa-solid fa-cart-shopping"></i>
                        <span className="absolute top-[-13px] right-0 ">{cartItems?.items?.length || 0}</span>
                    </div>
                    <div onClick={HandleShowProfile} className="profile cursor-pointer">
                        <h1 className="w-[30px] h-[30px]  uppercase text-center flex justify-center items-center font-bold bg-black text-white rounded-full">{user?.username[0]}</h1>
                        <div className={`account-logout ${showProfile ? "block" : "hidden"}  absolute w-[150px] bottom-[-80px] right-[10px]  bg-white p-2 rounded-lg bg-white shadow-sm shadow-gray-300`}>
                                <div onClick={HandleShowProfile} className="text-base  font-medium mb-2  text-gray-600  flex justify-start items-center">
                                    <Link to={"/shop/account"} className="w-[100%]">
                                    <i className="font-medium text-black  fa-solid fa-user"></i>
                                    <span className="ml-2">Account</span>
                                    </Link>
                                </div>

                                <div onClick={() =>{ HandleShowProfile(); HandleUserLogout();}} className="text-base  font-medium text-gray-600 flex justify-start items-center">
                                    <i className="font-medium text-black fa-solid fa-arrow-right-from-bracket"></i>
                                    <span className="ml-2">Logout</span>
                                </div>
                        
                        </div>
                    </div>
                </div>


            </div>
    </nav>
    {/* Navbar end */}

    {/* Mobile sidebar  */}
    <ShopMobileSidebar cartItems={cartItems} HandleCartSidebar={HandleCartSidebar} HandleNavigateFilters={HandleNavigateFilters} HandleUserLogout={HandleUserLogout} HandleShowSidebar={HandleShowSidebar} showSidebar={showSidebar}/>
   
   {/* CartSidebar */}
   <CartSidebar HandleDeleteProductQty={HandleDeleteProductQty} HandleUpdateProductQuantity={HandleUpdateProductQuantity} cartItems={cartItems.items} showCart={showCart} HandleCartSidebar={HandleCartSidebar}/>
    </>)
}

export default ShopHeader;