function AdminProductCard({HandleEditStatus , HandleDeleteProducts , productsList}){

    
    return(<>
    <section className="product-section my-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-center justify-center gap-6">
        { productsList && productsList.length > 0 && productsList.map((item) => {

        

            return(
                <article key={item?._id} className="single-product shadow-lg shadow-gray-100 rounded-lg">
            <div className="img-container w-[100%] h-80 object-center object-contain overflow-hidden">
                <img className="w-[100%] h-[100%] object-center object-contain overflow-hidden" src={item?.image?.url} alt={item?.title} />
            </div>
            <div className="product-info p-3">
                <h1 className="text-lg  text-blue-400 tracking-[1px] font-medium">{item?.title}</h1>
                <div className="price-saleprice mt-3 flex justify-between items-center">
                    <h2 className={item?.salePrice !=null && item?.salePrice > 0 ? "text-xl font-medium text-red-400 tracking-[1px] line-through decoration-solid decoration-2 decoration-red-400":"text-xl font-medium text-black tracking-[2px]    " }>${item?.price}</h2>
                   {item?.salePrice != null && item?.salePrice > 0 && <h2 className='text-xl font-medium text-black tracking-[2px]'>${item?.salePrice}</h2> }
                </div>
                <div className="edit-delete-btns mt-3 flex justify-between items-center">
                    <button  onClick={() => HandleEditStatus(item?._id)} className="py-1 px-3 text-lg rounded-lg text-white  bg-blue-600 cursor-pointer hover:opacity-70 transition-all linear duration-300">Edit</button>
                    <button onClick={() => HandleDeleteProducts(item?._id)} className="py-1 px-3 text-lg rounded-lg text-white bg-red-600   cursor-pointer hover:opacity-70 transition-all linear duration-300">Delete</button>
                </div>
            </div>
        </article>
            )
        })
    }
    </section>
    </>)
}

export default AdminProductCard;