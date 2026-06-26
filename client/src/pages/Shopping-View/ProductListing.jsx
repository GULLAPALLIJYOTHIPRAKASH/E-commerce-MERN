import { useState } from "react";
import DesktopFilter from "../../components/Shopping-View/DesktopFilter";
import { Sort } from "../../components/config/config";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { ShopAllProducts, ShopSingleProduct } from "../../redux/Shop/product-slice";
import ShopProductCard from "../../components/Shopping-View/ShopProductCard";
import ShopProductDetails from "../../components/Shopping-View/ShopProductDetails";

function ProductListing(){

    const [showSort , setShowSort] = useState(false);
    const[sort,setSort] =useState("LH");
    const dispatch  = useDispatch();
    const[singleProduct , setSingleProduct]= useState(null);


    // shop product redux
    const {productsList} = useSelector((state) => state.ShopProduct)


    // show/hide sort
    const HandleShowSort = () => {

        setShowSort(!showSort);

    }

    // handle sort LH,HL,AZ,ZA
    const HandleSort = (type) => {

        setSort(type);
        
    }


    // Get Single products
    const HandleSingleProduct = async (productId) => {
        console.log("Single Product : ",productId);

        if(productId){

            


            
            try{

                const response  = await dispatch(ShopSingleProduct(productId)).unwrap();

                console.log(response);

                if(response?.success){

                    setSingleProduct(response?.data)
                }
                
            }catch(error){


                console.log(error);
                
            }
        }
        else{

            setSingleProduct(null);
        }

    }
    

    useEffect(() => {


        dispatch(ShopAllProducts());
        
    },[dispatch]);

    

    
    
    return(<>
    <div className="shop-products-container w-[100%] min-h-screen  p-4  border-1">
        <div className="shop-products-center w-[100%] h-[100%]  flex">
            {/* filters  category/brand */}
            <div className="filter-container hidden lg:block lg:w-[20%] xl:w-[15%]">
                <div className="heading">
                    <h1 className="text-[20px] font-medium text-black tracking-[1px]"><i className="text-xl fa-solid fa-sliders"></i> Filter</h1>
                </div>
                {/* filters */}
               <DesktopFilter/>
            
            </div>
            {/* products  */}
            <div className="sub-container w-[100%] lg:w-[80%] xl:w-[90%] lg:pl-4">
                {/* heading */}
                <div className="heading flex justify-between ">
                    <h1 className="text-base lg:text-lg font-semibold tracking-[1px]">All Products</h1>
                    <div className="flex gap-[10px] justify-center items-center">
                        <h2 className="text-base font-normal   text-gray-600">10 Products</h2>
                        <div className="sort-container relative" >
                           <h1 onClick={HandleShowSort} className="text-base font-medium text-black border-2 border-gray-300 select-none rounded-lg text-center py-1 px-2 cursor-pointer"><i className=" rotate-90  fa-solid fa-arrow-right-arrow-left"></i> <span className="ml-1 font-normal">Sort</span></h1> 
                           <ul className={`sort-list bg-white rounded-lg shadow-sm py-2 px-5 w-[180px] ${showSort ? "block" : "hidden"}  absolute bottom-[-120px] right-0 transtion-all linear duration-300`}>
                            {
                                Sort.map((item) =>{

                                    return(

                                    <li onClick={() =>{ HandleSort(item.id); HandleShowSort() }} key={item.id + "sort"}  className={`text-[14px] text-gray-500  hover:font-bold transition-all linear duration-300 ${sort == item.id ? "font-bold list-disc" :"font-medium"} hover:list-disc cursor-pointer`}>{item.label}</li>

                                    )
                                })
                            }
                           </ul>
                        </div>

                    </div>
                </div>

                {/* products list */}
                <div className="list">
               <ShopProductCard HandleSingleProduct={HandleSingleProduct} productsList={productsList}/>
                </div>
            </div>
        </div>
    </div>

    {/* product details */}
    <ShopProductDetails HandleSingleProduct={HandleSingleProduct} singleProduct={singleProduct} />
    </>)
}
export default ProductListing;