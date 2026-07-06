function CartItemsCard({cartItems , HandleUpdateProductQuantity, HandleDeleteProductQty}){

    return(
        <>
        <section className="cart-section mt-5 flex flex-col space-y-5">
                {
                    cartItems?.map((item) => {


                        return(
                            <article key={item?.productId + "cart"} className="single-cart w-[100%] flex  gap-[10px]">
                                <div className="img-container w-20 h-20  object-center object-contain overflow-hidden">
                                    <img className="w-[100%] h-[100%] object-center object-contain overflow-hidden" src={item?.image.url} alt="cart product Image" />
                                </div>
                                <div className={`item-info  w-[100%]  flex justify-between items-start`}>
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
                                     <div className=" price-delete flex flex-col justify-end items-end">
                                            <h1 className="text-base font-medium">${item?.salePrice != null && item?.salePrice > 0 ? (item?.salePrice) * item?.quantity : (item?.price) * item?.quantity   }</h1>
                                            <span onClick={() => HandleDeleteProductQty(item?.productId.toString())} className="text-base mt-1 text-right font-medium text-red-600 cursor-pointer"><i className="fa-regular fa-trash-can"></i></span>
                                    </div>
                                </div>

                            </article>
                        )
                    })

                }
                
            </section> 
            </>

    )
}

export default CartItemsCard;