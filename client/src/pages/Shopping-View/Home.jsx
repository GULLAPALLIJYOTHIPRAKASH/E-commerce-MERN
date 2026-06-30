import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShopGetAllBanners, ShopGetAllProducts } from "../../redux/Shop/home-slice";
import { Brand, Category} from "../../components/config/config";
import ShopProductCard from "../../components/Shopping-View/ShopProductCard"
import {useNavigate} from "react-router-dom";


const categoryIcons = {

    men:<i className="text-4xl fa-solid fa-shirt"></i>,
    women:<i className="text-5xl fa-solid fa-person-dress"></i>,
    kids:<i className=" text-5xl fa-solid fa-child"></i>,
    accessories:<i className="text-4xl fa-regular fa-clock"></i>,
    footwear: <i className="text-4xl fa-solid fa-shoe-prints"></i>
}


const brandIcons = {

    nike:<i className="text-4xl fa-solid fa-check"></i>,
    adidas:<i className="text-4xl fa-solid fa-radiation"></i>,
    puma:<i className="text-4xl fa-solid fa-horse-head"></i>,
    levi:<i className="text-4xl fa-brands fa-first-order"></i>,
    zara: <i className="text-4xl fa-solid fa-guarani-sign"></i>,
    "h&m" :<i className="text-4xl fa-brands fa-wizards-of-the-coast"></i>,
    samsung:<i className="text-4xl fa-brands fa-app-store"></i>,
    titan:<i className="text-4xl fa-solid fa-binoculars"></i>
}

function Home(){

    const dispatch = useDispatch();
    const {bannersList ,productsList} = useSelector((state) => state.ShopHomePage);
    const [slide , setSlide] = useState(0);
    const navigate = useNavigate();


    // switch auto slide
    useEffect(() => {

        let timer = setInterval(() => {

            

            setSlide((prev) => (prev + 1) % bannersList?.length)

        },5000);


        return () => clearInterval(timer);
    })


    // fetch All Banners
    useEffect(() => {

        dispatch(ShopGetAllBanners());
        dispatch(ShopGetAllProducts());

    },[dispatch])


    // Handle Navigate based  on category & brand
    const HandleNavigateToShopFilter = (type, option) => {

        // clear every time
        localStorage.removeItem("filters");

        const filters = {

            [type] : [option]
        }


        // set filter
        localStorage.setItem("filters" , JSON.stringify(filters)); 


        // navigate to products
        navigate('/shop/products');

    }


    // Handle Navigate to products page
    const HandleNavigateToProductsPage = () => {

        
        // clear filter
        localStorage.removeItem("filters");

        // scroll top
        window.scrollTo(0,0);

        navigate('/shop/products')
    }


    

    return(<>
    <div className="home-container">
        <div className="home-center">
            {/* Banner Images */}
            <div className="img-container relative w-[100%] h-auto lg:h-[650px]  overflow-hidden object-center object-cover ">
                <img  className="w-[100%] h-[100%] overflow-hidden object-center object-cover" src={bannersList[slide]?.banner_url} alt="banner" />
                <div className="prev-next-btns absolute w-[100%] h-[100%] top-0 left-0  p-2 flex justify-between items-center">
                    <button onClick={() => setSlide((prev) => (prev - 1 + bannersList?.length) % bannersList?.length)} className="bg-white py-1 px-3 font-medium cursor-pointer text-lg shadow-sm"><i className="fa-solid fa-angle-right"></i></button>
                    <button onClick={() => setSlide((prev) => (prev + 1) % bannersList?.length)} className="bg-white py-1 px-3 font-medium cursor-pointer text-lg shadow-sm"><i className="fa-solid fa-angle-left"></i></button>
                </div>
            </div>

            {/* Shop by Category */}
            <section className="category-section my-8 px-4 bg-white">
                <h1 className="text-2xl text-center font-bold">Shop by category</h1>
                
                    {/* <div className="cards w-[100%] mt-6 flex flex-wrap   flex-row justify-start items-center  gap-[20px] "> */}
                    <div className="cards w-[100%] mt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-center items-center  gap-[30px] ">

                        {

                        Category?.map((item) => {


                            return(

                                <article onClick={() => HandleNavigateToShopFilter("category" , item.id)} key={item.id +"home"} className="bg-white w-[100%]  h-[120px] flex flex-col justify-center items-center rounded-md shadow-md border-2 border-gray-100 text-center p-4 cursor-pointer">
                    
                                <h1 className="font-bold">{categoryIcons[item.id]}</h1>
                                <h2 className="text-lg font-medium mt-2">{item.label}</h2>
                                </article>
                            )
                        })
                        }

                    </div>
                
            </section>

            {/* Shop by Brand  */}
            <section className="brand-section my-8 px-4 bg-white">
                <h1 className="text-2xl text-center font-bold">Shop by brand</h1>
                
                    <div className="cards w-[100%] mt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  gap-[30px] ">

                        {

                        Brand?.map((item) => {


                            return(

                                <article onClick={() => HandleNavigateToShopFilter("brand" , item.id)} key={item.id +"home"} className="bg-white w-[100%] h-[120px] flex flex-col justify-center items-center rounded-md shadow-md border-2 border-gray-100 text-center p-4 cursor-pointer">
                    
                                <h1 className="font-bold">{brandIcons[item.id]}</h1>
                                <h2 className="text-lg font-medium mt-2">{item.label}</h2>
                                </article>
                            )
                        })
                        }

                    </div>
                
            </section>


            {/* products section */}
            <section className="brand-section my-8 px-4 bg-white">
                <h1 className="text-2xl text-center font-bold">Feature Products</h1>
                
                    <ShopProductCard HandleNavigateToProductsPage={HandleNavigateToProductsPage} productsList={productsList}/>
                
            </section>
        </div>
    </div>
    
    </>)
}
export default Home;