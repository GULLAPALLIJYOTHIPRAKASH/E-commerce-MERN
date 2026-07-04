
function CartSidebar({HandleDeleteProductQty , HandleUpdateProductQuantity , cartItems ,showCart , HandleCartSidebar}){

    const totalCart = cartItems && cartItems.length > 0 && cartItems.reduce((acc , item) => {

        console.log( item );
        
        return(

         acc += (item?.salePrice != null && item?.salePrice > 0 ? item.salePrice :  item.price)* item.quantity
        )
    },0) 

    
    
    

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
            <section className="cart-section mt-5 flex flex-col space-y-5">
                {
                    cartItems?.map((item) => {


                        return(
                            <article key={item?.productId + "cart"} className="single-cart w-[100%] flex  gap-[10px]">
                                <div className="img-container w-20 h-20  object-center object-contain overflow-hidden">
                                    <img className="w-[100%] h-[100%] object-center object-contain overflow-hidden" src={item?.image.url} alt="" />
                                </div>
                                <div className="item-info w-[80%]  flex justify-between items-start">
                                    <div className="title w-[100%]">
                                        <h1 className="text-[15px] font-medium line-clamp-1">{item?.title}</h1>
                                        
                                        {/* plus-minus */}
                                        <div className="plus-minus mt-1 flex gap-3">
                                            <div onClick={ () => item?.quantity > 1 ? HandleUpdateProductQuantity(item?.productId , item?.quantity-1 ,"minus") : ""} className={`minus   w-[22px] h-[22px] border-1 text-center flex justify-center items-center border-gray-300 rounded-full ${item?.quantity != 1 ?"bg-white cursor-pointer ":"bg-gray-200 cursor-not-allowed"}`}><i className="text-sm font-medium fa-solid fa-minus"></i></div>
                                            <div className="quantity text-[15px] font-medium select-none">{item?.quantity}</div>
                                            <div onClick={() => HandleUpdateProductQuantity(item?.productId , item?.quantity+1 ,"plus")} className={`plus w-[22px] h-[22px] border-1 text-center flex justify-center items-center border-gray-300 rounded-full cursor-pointer`}><i className="text-sm font-medium fa-solid fa-plus"></i></div>
                                        </div>
                                       
                                    </div>

                                    {/* price-delete */}
                                     <div className="price-delete flex flex-col justify-end items-end">
                                            <h1 className="text-base font-medium">${item?.salePrice != null && item?.salePrice > 0 ? (item?.salePrice) * item?.quantity : (item?.price) * item?.quantity   }</h1>
                                            <span onClick={() => HandleDeleteProductQty(item?.productId.toString())} className="text-base mt-1 text-right font-medium text-red-600 cursor-pointer"><i className="fa-regular fa-trash-can"></i></span>
                                        </div>
                                </div>

                            </article>
                        )
                    })

                }
                
            </section> :

            <p className="text-base font-normal text-center my-5">Your Cart is empty </p>
            }

            <div className="total-cart-price mt-2">

                <div className="cart-total flex justify-between items-center">
                    <h1 className="text-base font-bold ">Total</h1>
                    <h1 className="text-base font-bold ">${totalCart || 0}</h1>
                </div>
                <div className="button w-[100%] bg-black text-white text-center py-2 rounded-lg mt-3 cursor-pointer hover:opacity-70 transition-all linear duration-300">Check out</div>
            </div>
            
        </div>
    </div>
    </>)
}

export default CartSidebar;