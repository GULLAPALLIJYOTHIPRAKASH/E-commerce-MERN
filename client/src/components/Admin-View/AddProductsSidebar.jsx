import { Brand, Category } from "../config/config";

function AddProductsSidebar({addProductsform ,HandleAllInputs ,  showAddProducts,HandleShowAddProducts}){

    return(<>
    <aside className={`products-sidebar-container w-[100%] h-[100%] fixed flex justify-end top-0 ${showAddProducts ? "left-0" : "left-[100%]"} bg-black/30 transition-all linear duration-500` }>
        <div className="products-sidebar-center w-[70vw]  overflow-hidden overflow-y-auto    sm:w-[50vw] lg:w-[30vw] bg-white p-6">
            <div className="heading w-[100%] flex justify-between items-center">
                <h1 className="text-lg font-medium">Add New Product</h1>
                <div className="close-icon" onClick={HandleShowAddProducts}>
                        <i className="text-lg font-medium cursor-pointer fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="form-section mt-5">
                <form className="products-form">

                    {/* upload img */}
                    <div className="field mb-4">
                        <label htmlFor="" className="text-base font-normal ">Upload a Image</label>
                        <input  type="file" name="productimg" id="productimg" accept="/*" className="hidden" />

                        <label htmlFor="productimg" className=" w-[100%] mt-1 block p-4 text-center cursor-pointer border-2 border-dashed border-gray-300">
                            <i className=" text-lg fa-solid fa-cloud-arrow-up"></i>
                            <p className="text-base">Click to upload image</p>
                        </label>
                    </div>

                    {/* title */}
                    <div className="field mb-4">
                        <label htmlFor="title" className="text-base font-normal">Title</label>
                        <input onChange={HandleAllInputs} required value={addProductsform?.title} className="w-[100%] block mt-1 p-2 border-2 border-gray-300 rounded-lg outline-none" type="text" name="title" id="title" placeholder="Enter product title" />
                    </div>
                    {/* description */}
                     <div className="field mb-4">
                        <label htmlFor="description" className="text-base font-normal">Description</label>
                        <textarea onChange={HandleAllInputs} required value={addProductsform?.description} className="w-[100%] block mt-1 p-2 border-2 border-gray-300 rounded-lg outline-none" type="text" name="description" id="description" placeholder="Enter product description"></textarea>
                    </div>
                    {/* category */}
                    <div className="field mb-4">
                        <label htmlFor="category" className="text-base font-normal">Category</label>
                        <select onChange={HandleAllInputs} value={addProductsform?.category} className="w-[100%] block mt-1 p-2 border-2 border-gray-300 rounded-lg outline-none" type="text" name="category" id="category" >
                            {
                                Category.map((item) => {
                                    return(
                                        <option key={item.id + "add"} value={item.id}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {/* brand */}
                    <div className="field mb-4">
                        <label htmlFor="brand" className="text-base font-normal">Brand</label>
                        <select onChange={HandleAllInputs} required value={addProductsform?.brand} className="w-[100%] block mt-1 p-2 border-2 border-gray-300 rounded-lg outline-none" type="text" name="brand" id="brand" >
                            {
                                Brand.map((item) => {
                                    return(
                                        <option key={item.id + "add"} value={item.id}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {/* price */}
                     <div className="field mb-4">
                        <label htmlFor="price" className="text-base font-normal">Price</label>
                        <input step={1} onChange={HandleAllInputs} min={1} required value={addProductsform?.price} className="w-[100%] block mt-1 p-2 border-2 border-gray-300 rounded-lg outline-none" type="number" name="price" id="price" placeholder="Enter product price" />
                    </div>
                     {/* saleprice */}
                     <div className="field mb-4">
                        <label htmlFor="salePrice" className="text-base font-normal">Sale Price</label>
                        <input step={1} onChange={HandleAllInputs} min={0}  value={addProductsform?.salePrice} className="w-[100%] block mt-1 p-2 border-2 border-gray-300 rounded-lg outline-none" type="number" name="salePrice" id="salePrice" placeholder="Enter sale price (optional)" />
                    </div>

                    {/* total stock */}
                     <div className="field mb-4">
                        <label htmlFor="totalStock" className="text-base font-normal">TotalStock</label>
                        <input step={1} onChange={HandleAllInputs} min={1} required value={addProductsform?.totalStock} className="w-[100%] block mt-1 p-2 border-2 border-gray-300 rounded-lg outline-none" type="number" name="totalStock" id="totalStock" placeholder="Enter total stock" />
                    </div>

                    <div className="btn mb-4">
                        <button className="w-[100%] p-2 bg-black text-white outline-none rounded-lg text-base cursor-pointer hover:opacity-80 transition-all linear duration-300">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </aside>
    </>)
}

export default  AddProductsSidebar;