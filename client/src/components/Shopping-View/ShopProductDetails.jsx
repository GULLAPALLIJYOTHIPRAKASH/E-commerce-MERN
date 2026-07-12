function ShopProductDetails({reviewsList , SubmitReview , HanldeReviewMsg , revmsg ,rating, HandleRating , HandleAddToCart , HandleSingleProduct , singleProduct}){

    return(<>
    <div className={`product-details-container w-[100%] min-h-[100vh] ${singleProduct?._id?.length ? "block" :"hidden" }  fixed top-0 left-0 bg-black/30 z-100 border-1 transition-all ease-in-out duration-500 flex justify-center items-center`}>
    <div className="bg-white rounded-lg w-[100%]  max-w-[650px] min-h-[350px]  mx-[20px] rounded-lg    p-3">
        <div className="close-icon text-gray-500 font-bold text-xl text-right">
            <i onClick={() => {HandleSingleProduct(null)}} className="fa-solid fa-xmark cursor-pointer"></i>
        </div>

        <div className="product-details-center  sm:flex sm:gap-[20px]">
            <div className="img-container relative w-[100%] h-[150px] sm:h-auto overflow-hidden object-center object-contain">
                <img className="w-[100%] h-[100%]  overflow-hidden object-center object-contain" src={singleProduct?.image.url} alt="" />
            {/* sale price */}
            {singleProduct?.totalStock > 0 &&  singleProduct?.salePrice != null && singleProduct?.salePrice > 0 && <div className="sale-price text-white p-[2px] px-3 rounded-full text-sm bg-blue-400 absolute top-2 right-2">
                sale
            </div>}

            {/* stock  */}
                {singleProduct?.totalStock <= 10 && <div className="sale-price text-white p-[2px] px-3 rounded-full text-sm bg-gray-500 absolute top-2 left-2">
                stock {singleProduct?.totalStock} left
            </div>}

            {/* out of stock  */}
                {singleProduct?.totalStock == 0 && <div className="sale-price text-white p-[2px] px-3 rounded-full text-sm bg-red-500 absolute top-2 left-2">
                Out of stock
            </div>}
            
            </div>
            {/* product info */}
            <div className="product-info p-3 w-[100%] flex flex-col gap-3 ">
                <h1 className="text-black font-bold text-base lg:text-lg">{singleProduct?.title}</h1>

                <div className="brand-category flex gap-[15px]">
                    <p className="text-sm text-gray-400 capitalize">{singleProduct?.category}</p>
                    <p className="text-sm text-gray-400 capitalize">{singleProduct?.brand}</p>
                </div>
                <p className="text-sm text-black">{singleProduct?.description}</p>
                <div className="price-priceSale flex justify-between items-center">
                    <p className={`text-[16px] font-bold ${ singleProduct?.salePrice != null && singleProduct?.salePrice > 0 && "line-through" } decoration-1`}>${singleProduct?.price} </p>
                    {singleProduct?.salePrice != null && singleProduct?.salePrice > 0 && <p className="text-[16px] font-bold text-gray-500">${singleProduct?.salePrice}</p>}
                </div>
                {/* rating */}
                <div className="rating ">
                    {[...Array(5)].map((_, index) => {

                        return(
                            <i key={"star" + index } className="fa-solid fa-star"></i>
                        )
                    })} (4.5)
                </div>
                {/* out of stock */}
                {
            singleProduct?.totalStock > 1 ? 
            <button onClick={() => HandleAddToCart(singleProduct?._id.toString() , singleProduct?.totalStock)} className="bg-black text-white w-[100%] p-2 cursor-pointer hover:opacity-70 rounded-lg transition-all linear duration-300">Add to cart</button>
            :<button className="bg-black text-white w-[100%] p-2  opacity-80 rounded-lg cursor-not-allowed transition-all linear duration-300">Out of stock</button>
                }

                {/* review */}
               
            <div className="review-container mt-2">
                { reviewsList && reviewsList.length > 0 && (<>
            <h1 className="text-base font-medium ">Reviews</h1>
                <div className="review-list w-[100%] max-h-[100px]  overflow-y-auto">
                    {/* review-card */}
                    {
                        reviewsList && reviewsList.length > 0 &&  reviewsList.map((item) => {

                            return(
                                <div key={item?._id } className="review-card w-[100%] flex justify-start items-start p-2">
                        <div className="logo w-[30px] h-[30px] mr-2 font-bold bg-gray-100 rounded-full text-centet capitalize flex justify-center items-center">
                            {item?.username[0]}
                        </div>
                        <div className="review-info">
                            <h1 className="text-sm font-bold">{item?.username}</h1>
                            <div className="star">
                                {
                                    [...Array(5)].map((_,indx) => {

                                        const i = indx + 1;


                                    return(
                                    <i  key={"review-star" + indx } className={`fa-solid text-[11px]  ${ i <= item?.reviewValue  ? "text-yellow-600" : "text-black"}  fa-star`}></i>
                                    )
                                })}
                            </div>
                            <p className="comment line-clamp-1 text-[12px]">{item?.reviewMessage}</p>
                        </div>

                    </div>
                            )
                        })
                    }
                    
            </div>
       </> )}
            {/* review form */}
            <div className="review-form mt-2">
                <p className="text-sm font-medium">write a review</p>
                <div className="star mt-1">
                    {
                        [...Array(5)].map((_,indx) => {

                        const i = indx + 1;


                        return(
                        <i onClick={() => HandleRating(i)} key={"review-star" + indx } className={`fa-solid text-[16px] ${ i <= rating ? "text-yellow-600" : "text-black"} fa-star`}></i>
                        )
                    })}
                </div>
                <div className="field mt-1 ">
                    <input value={revmsg} onChange={(e) => HanldeReviewMsg(e.target.value) } className="p-2  w-[90%] outline-none border-2 border-gray-300 rounded-lg" placeholder="provide review....." type="text" name="review-msg" id="review-msg" />
                    <i onClick={() => SubmitReview(singleProduct?._id)} className="fa-regular fa-paper-plane w-[10%] text-[30px] cursor-pointer"></i>
                </div>
            </div>
            </div>
            </div>

            
        </div>
        </div>
    </div>
    </>)
}

export default ShopProductDetails;