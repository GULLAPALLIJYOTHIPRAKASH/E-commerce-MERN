import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, ShopSearch } from "../../redux/Shop/search-slice";
import { useSearchParams } from "react-router-dom";
import ShopProductCard from "../../components/Shopping-View/ShopProductCard";
import { ShopAddToCart, ShopGetAllCartItems } from "../../redux/Shop/cart-slice";
import { toast } from "react-toastify";

function Search(){
    const dispatch = useDispatch();

    // search products
    const [search , setSearch] = useState("");
    const [searchParams , setSearchParams] = useSearchParams("");

    // search redux
    const {searchProducts} = useSelector((state) => state.ShopSearch);

    
    // user redux
    const {user} = useSelector((state) => state.auth);

    const {cartItems} = useSelector((state) => state.ShopCart);

    // search products
    useEffect(() => {

        let timer ;

        if(search.length > 0 && search.trim() != "" && search.length >= 3){


            timer = setTimeout(() => {

                try {
                
                    setSearchParams(new URLSearchParams(`keyword=${search}`))
                    dispatch(ShopSearch(search)).unwrap();
                } catch (error) {

                    console.log(error);
                    
                    
                }
                
            }, 1000);


        }else{

            setSearchParams("");

            // reset 
            dispatch(resetSearch());
        }

        () => clearInterval(timer);

    },[dispatch,search]);


    // Handle  Add to cart
    const HandleAddToCart = async (productId , stock) => {
    
            const getCart = cartItems?.items || []; 
    
            
            if(getCart.length > 0 ){
                
                // find product Id index from cart
                const cartProductIdIndex = getCart.findIndex((item) => item.productId.toString() === productId );
    
                if(cartProductIdIndex > -1){
    
                    // get current product quantity from cart
                    const currentProductquantity = getCart[cartProductIdIndex].quantity;                
                    
    
                    if(currentProductquantity + 1 > stock){
    
                        toast.warn(`Only ${currentProductquantity} items can be added to cart`, {
    
                            toastId:"stockCart"
                        });
    
                        return ;
                    }
                
            }
            }
            
    
            try {
    
                const response = await dispatch(ShopAddToCart({userId:user?.id , productId , quantity:1})).unwrap();
                console.log(response);
    
                if(response?.success){
                    // refetch again for updated cart
                    dispatch(ShopGetAllCartItems(user?.id));
                    
                    toast.success(`${response.message}` , {toastId:"AddToCart"})
                }
                
            } catch (error) {
    
    
                console.log(error);
                
                
            }
            
            
        }
    
    return(<>
    
    <div className="search-container">
        <div className="search-center p-4">
            <div className="heading">
                <input onChange={(e) => setSearch(e.target.value)} className="w-[100%] px-2 py-4 outline-none border-1 border-gray-400 rounded-md" placeholder="Search for your products" type="text" name="search" id="search"  />
            </div>

            {/* search products */}
            {/* products section */}
            <section className="brand-section my-8 px-4 bg-white">
                
                    <ShopProductCard HandleAddToCart={HandleAddToCart}  productsList={searchProducts}/>
                
            </section>


            {/* error message */}
            {searchProducts && searchProducts.length == 0 && <p className="text-[14px] md:text-lg text-red-500 my-5 text-center font-medium">No product found, Try to search differently</p>}
        </div>
    </div>
    </>)
}

export default Search;