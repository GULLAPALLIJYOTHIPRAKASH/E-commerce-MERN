import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShopGetAllBanners } from "../../redux/Shop/home-slice";

function Home(){

    const dispatch = useDispatch();
    const {bannersList} = useSelector((state) => state.ShopHomePage);
    const [slide , setSlide] = useState(0);


    // switch auto slide
    useEffect(() => {

        let timer = setInterval(() => {

            

            setSlide((prev) => (prev + 1) % bannersList?.length)

        },5000);


        return () => clearInterval(timer);
    })





    // fetch All Banners
    useEffect(() => {

        dispatch(ShopGetAllBanners())

    },[dispatch])


    

    return(<>
    <div className="home-container">
        <div className="home-center">
            <div className="img-container relative w-[100%] h-auto lg:h-[650px]  overflow-hidden object-center object-cover border-1">
                <img  className="w-[100%] h-[100%] overflow-hidden object-center object-cover" src={bannersList[slide]?.banner_url} alt="banner" />
                <div className="prev-next-btns absolute w-[100%] h-[100%] top-0 left-0  p-2 flex justify-between items-center">
                    <button onClick={() => setSlide((prev) => (prev - 1 + bannersList?.length) % bannersList?.length)} className="bg-white py-1 px-2 font-medium text-lg shadow-sm"><i className="fa-solid fa-angle-right"></i></button>
                    <button onClick={() => setSlide((prev) => (prev + 1) % bannersList?.length)} className="bg-white py-1 px-2 font-medium text-lg shadow-sm"><i className="fa-solid fa-angle-left"></i></button>
                </div>
            </div>
        </div>
    </div>
    
    </>)
}
export default Home;