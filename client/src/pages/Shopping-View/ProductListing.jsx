import { useState } from "react";
import DesktopFilter from "../../components/Shopping-View/DesktopFilter";
import { Sort } from "../../components/config/config";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { ShopAllProducts, ShopSingleProduct } from "../../redux/Shop/product-slice";
import ShopProductCard from "../../components/Shopping-View/ShopProductCard";
import ShopProductDetails from "../../components/Shopping-View/ShopProductDetails";
import {useSearchParams} from 'react-router-dom';
import {toast} from "react-toastify";
import { ShopAddToCart, ShopGetAllCartItems } from "../../redux/Shop/cart-slice";

// query search url
const createSearchParamsHelper = (filters) => {

    

    const queryparams = [];

   for(let [key , val] of Object.entries(filters)){

    

    if(Array.isArray(val) && val.length > 0){

        // array into string
        let queryStr = val.join(",");

        

        // push url 
        queryparams.push(`${key}=${encodeURIComponent(queryStr)}`);
    }
   }
   
        // return join two url with &
   return queryparams.join("&");
}

function ProductListing(){

    const [showSort , setShowSort] = useState(false);
    const[sort,setSort] =useState("LH");
    const dispatch  = useDispatch();
    const[singleProduct , setSingleProduct]= useState(null);
    const [filters , setFilters] = useState({});

    // search params
    const [searchParams , setSearchParams] = useSearchParams("");

    const getCurrentCategoryNavOption = searchParams.get("category")


    // shop product redux
    const {productsList} = useSelector((state) => state.ShopProduct);

    // user redux
    const {user} = useSelector((state) => state.auth);

    const {cartItems} = useSelector((state) => state.ShopCart);


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
        // console.log("Single Product : ",productId);

        if(productId){

            


            
            try{

                const response  = await dispatch(ShopSingleProduct(productId)).unwrap();

                // console.log(response);

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


    // Handle Filter
    const HandleFilter = async (filterType , filterOption) => {

        // console.log(filterType,filterOption);
        // copy of filter state
        let copyFilter = {...filters};

        // find the filter type
        const findFilterType = Object.keys(copyFilter).indexOf(filterType);


        // check  filter type not exist
        if(findFilterType === -1){

            copyFilter = {

                ...copyFilter,
                [filterType] : [filterOption]
            }

        }else{


            // check filter option is exist or not

            let findFilterOption = copyFilter[filterType].indexOf(filterOption );

           if(findFilterOption === -1){

            copyFilter[filterType].push(filterOption);
            
           }else{

            // remove it from array 
            copyFilter[filterType].splice(findFilterOption , 1)

           }
            

        }

        
        setFilters(copyFilter);

        localStorage.setItem("filters" , JSON.stringify(copyFilter))
        
        
        
    }

    

    // Fetch all products
    useEffect(() => {
        if(filters != null && sort != null){

            
            dispatch(ShopAllProducts({filterparams:filters , sortBy:sort}));
        }   

        
    },[dispatch,filters , sort]);

    // inital value for sort & filter
    useEffect(() => {


        setSort("LH");
        setFilters(JSON.parse(localStorage.getItem("filters")) || {});


    },[getCurrentCategoryNavOption]);


    // generate  url  with filter
    useEffect(() => {

        if(filters && Object.keys(filters).length > 0){

            const createQueryString = createSearchParamsHelper(filters);

            // add url to search params
            setSearchParams(new URLSearchParams(createQueryString));

        }else{

            // clear url when filter empty
            setSearchParams("");
        }


    },[filters]);


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

                    toast.warn(`only ${currentProductquantity} items can be added to cart`, {

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




    useEffect(() => {

        dispatch(ShopGetAllCartItems(user?.id))

    },[dispatch])
  
    

    

    
    
    return(<>
    <div className="shop-products-container w-[100%] min-h-screen  p-4  border-1">
        <div className="shop-products-center w-[100%] h-[100%]  flex">
            {/* filters  category/brand */}
            <div className="filter-container hidden lg:block lg:w-[20%] xl:w-[15%]">
                <div className="heading">
                    <h1 className="text-[20px] font-medium text-black tracking-[1px]"><i className="text-xl fa-solid fa-sliders"></i> Filter</h1>
                </div>
                {/* filters */}
               <DesktopFilter filters={filters} HandleFilter={HandleFilter}/>
            
            </div>
            {/* products  */}
            <div className="sub-container w-[100%] lg:w-[80%] xl:w-[90%] lg:pl-4">
                {/* heading */}
                <div className="heading flex justify-between ">
                    <h1 className="text-base lg:text-lg font-semibold tracking-[1px]">All Products</h1>
                    <div className="flex gap-[10px] justify-center items-center">
                        <h2 className="text-base font-normal   text-gray-600">{productsList?.length} Products</h2>
                        <div className="sort-container relative" >
                           <h1 onClick={HandleShowSort} className="text-base font-medium text-black border-2 border-gray-300 select-none rounded-lg text-center py-1 px-2 cursor-pointer"><i className=" rotate-90  fa-solid fa-arrow-right-arrow-left"></i> <span className="ml-1 font-normal">Sort</span></h1> 
                           <ul className={`sort-list bg-white rounded-lg shadow-sm py-2 px-5 w-[180px] ${showSort ? "block" : "hidden"}  absolute bottom-[-110px] right-0 transtion-all linear duration-300 z-30`}>
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
               <ShopProductCard HandleAddToCart={HandleAddToCart} HandleSingleProduct={HandleSingleProduct} productsList={productsList}/>
                </div>
            </div>
        </div>
    </div>

    {/* product details */}
    <ShopProductDetails HandleAddToCart={HandleAddToCart} HandleSingleProduct={HandleSingleProduct} singleProduct={singleProduct} />
    </>)
}
export default ProductListing;