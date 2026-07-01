import { useLocation } from "react-router-dom";

function ShopProductCard({HandleAddToCart , HandleSingleProduct= () =>{} , productsList , HandleNavigateToProductsPage=() => {}}){

    const location = useLocation();

    
    return(<>
     <section className="product-list mt-5 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
    {/*single product  */}
    {
        productsList && productsList.length > 0  && productsList.map((item) => {

            return(<article onClick={() => {HandleSingleProduct(item?._id) ; HandleNavigateToProductsPage()}} key={item?._id} className="single-product  cursor-pointer bg-white shadow-md rounded-lg hover:scale-[1.025] hover:translate-y-[-4px] transition-all linear duration-500">
                        <div className="img-container relative w-[100%] h-60 overflow-hidden object-contain object-center">
                            <img className="w-[100%] h-[100%] overflow-hidden object-center object-contain" src={item?.image?.url} alt="product Image" />

                            {/* sale price */}
                           {item.totalStock > 0 &&  item.salePrice != null && item.salePrice > 0 && <div className="sale-price text-white p-[2px] px-3 rounded-full text-sm bg-blue-400 absolute top-2 right-2">
                                sale
                            </div>}

                            {/* stock  */}
                             {item.totalStock <= 10 && <div className="sale-price text-white p-[2px] px-3 rounded-full text-sm bg-gray-500 absolute top-2 left-2">
                                stock {item.totalStock} left
                            </div>}

                            {/* out of stock  */}
                             {item.totalStock == 0 && <div className="sale-price text-white p-[2px] px-3 rounded-full text-sm bg-red-500 absolute top-2 left-2">
                                Out of stock
                            </div>}

                        </div>
                        <div className="product-info p-3 flex flex-col space-y-2">
                            <h1 className="text-black font-bold text-base">{item?.title}</h1>
                            <div className="brand-category flex justify-between items-center">
                                <p className="text-sm text-gray-400 capitalize">{item?.category}</p>
                                <p className="text-sm text-gray-400 capitalize">{item?.brand}</p>
                            </div>
                            <div className="price-priceSale flex justify-between items-center">
                                <p className={`text-[16px] font-medium ${ item?.salePrice != null && item?.salePrice > 0 && "line-through" } decoration-1`}>${item?.price} </p>
                               {item?.salePrice != null && item?.salePrice > 0 && <p className="text-[16px] font-medium ">${item?.salePrice}</p>}
                            </div>
                            {/* out of stock */}
                            
                           { !location.pathname.includes("/home") &&  (
                        item?.totalStock > 1 ? 
                        <button onClick={(e) => {
                              e.stopPropagation();
                            HandleAddToCart(item?._id?.toString() , item?.totalStock)}}  className="bg-black text-white w-[100%] p-2 cursor-pointer hover:opacity-70 rounded-lg transition-all linear duration-300">Add to cart</button>
                        :<button className="bg-black text-white w-[100%] p-2  opacity-80 rounded-lg cursor-not-allowed transition-all linear duration-300">Out of stock</button>
        )}
    
                        </div>
                    </article>)
        })
    }
                    
                
    </section>
    </>)
}
export default ShopProductCard;