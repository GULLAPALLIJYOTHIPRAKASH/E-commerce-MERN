function ShopProductCard({HandleShowSingleProduct , productsList}){

    return(<>
     <section className="product-list mt-5 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
    {/*single product  */}
    {
        productsList && productsList.length > 0  && productsList.map((item) => {

            return(<article onClick={() => HandleShowSingleProduct(item?._id)} key={item?._id} className="single product bg-white shadow-md rounded-lg hover:scale-[1.025] hover:translate-y-[-4px] transition-all linear duration-500">
                        <div className="img-container relative w-[100%] h-60 overflow-hidden object-contain object-center">
                            <img className="w-[100%] h-[100%] overflow-hidden object-center object-contain" src={item?.image?.url} alt="product Image" />

                            {/* sale price */}
                           {item.salePrice != null && item.salePrice > 0 && <div className="sale-price text-white p-[2px] px-3 rounded-full text-sm bg-blue-400 absolute top-2 right-2">
                                sale
                            </div>}

                        </div>
                        <div className="product-info p-3 flex flex-col space-y-2">
                            <h1 className="text-black font-bold text-base">{item?.title}</h1>
                            <div className="brand-category flex justify-between items-center">
                                <p className="text-sm text-gray-400 capitalize">{item?.category}</p>
                                <p className="text-sm text-gray-400 capitalize">{item?.brand}</p>
                            </div>
                            <div className="price-priceSale flex justify-between items-center">
                                <p className={`text-[16px] font-medium ${ item.salePrice != null && item.salePrice > 0 && "line-through" } decoration-1`}>${item?.price} </p>
                               {item.salePrice != null && item.salePrice > 0 && <p className="text-[16px] font-medium ">${item?.salePrice}</p>}
                            </div>
                        <button className="bg-black text-white w-[100%] p-2 cursor-pointer hover:opacity-70 rounded-lg transition-all linear duration-300">Add to cart</button>
                        </div>
                    </article>)
        })
    }
                    
                
    </section>
    </>)
}
export default ShopProductCard;