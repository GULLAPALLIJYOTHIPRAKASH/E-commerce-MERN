import { useState } from "react";
import DesktopFilter from "../../components/Shopping-View/DesktopFilter";
import { Sort } from "../../components/config/config";
import { useEffect } from "react";

function ProductListing(){

    const [showSort , setShowSort] = useState(false);
    const[sort,setSort] =useState("LH");


    // show/hide sort
    const HandleShowSort = () => {

        setShowSort(!showSort);

    }

    // handle sort LH,HL,AZ,ZA
    const HandleSort = (type) => {

        setSort(type);
        
    }
    

    useEffect(() => {


        console.log(sort);
        
    },[sort])
    
    return(<>
    <div className="shop-products-container w-[100%] h-screen  p-4  border-1">
        <div className="shop-products-center w-[100%] h-[100%]  flex">
            {/* filters  category/brand */}
            <div className="filter-container hidden lg:block lg:w-[20%] border-1">
                <div className="heading">
                    <h1 className="text-[20px] font-medium text-black tracking-[1px]"><i className="text-xl fa-solid fa-sliders"></i> Filter</h1>
                </div>
                {/* filters */}
               <DesktopFilter/>
            
            </div>
            {/* products  */}
            <div className="sub-container w-[100%] lg:w-[80%] pl-4">
                <div className="heading flex justify-between ">
                    <h1 className="text-lg font-semibold tracking-[1px]">All Products</h1>
                    <div className="flex gap-[10px] justify-center items-center">
                        <h2 className="text-base font-medium  text-gray-600">10 Products</h2>
                        <div className="sort-container relative" >
                           <h1 onClick={HandleShowSort} className="text-xl font-medium text-black border-2 border-gray-300 rounded-lg text-center py-1 px-2 cursor-pointer"><i className=" rotate-90  fa-solid fa-arrow-right-arrow-left"></i> <span className="ml-1 font-normal">Sort</span></h1> 
                           <ul className={`sort-list bg-white rounded-lg shadow-sm py-2 px-5 w-[180px] ${showSort ? "block" : "hidden"} absolute bottom-[-120px] right-0 transtion-all linear duration-300`}>
                            {
                                Sort.map((item) =>{

                                    return(

                                    <li onClick={() =>{ HandleSort(item.id); HandleShowSort() }} key={item.id + "sort"}  className={`text-[15px] text-gray-500 font-medium hover:font-bold transition-all linear duration-300 ${sort == item.id && "font-bold list-disc"} hover:list-disc cursor-pointer`}>{item.label}</li>

                                    )
                                })
                            }
                           </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}
export default ProductListing;