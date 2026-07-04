import { Link, useNavigate } from "react-router-dom";
import { ShopNavLinks } from "../config/config";

function ShopMobileSidebar({cartItems , HandleCartSidebar , HandleNavigateFilters , HandleShowSidebar , showSidebar, HandleUserLogout}){
    const navigate = useNavigate();

    return(<>
    <div className={`sidebar-container block lg:hidden w-[100%] h-[100vh] bg-black/30 fixed top-0 ${showSidebar ? "left-0" :"left-[-100%]"} z-100 transition-all linear duration-500`}>
        <div className="sidebar-center w-[100%] sm:w-[60vw] h-[100%] bg-white ">
            <div className="heading p-6 flex justify-between items-center">
                <div className="logo-section" onClick={HandleShowSidebar}>
                    <Link to={'/shop/home'}>
                        <i className="text-2xl font-semibold fa-brands fa-airbnb"></i>
                        <span className="text-xl font-semibold ml-1 tracking-[1px]">Ecommerce</span>
                    </Link>
                </div>
                <div className="close-icon border-2 border-gray-300 py-2 px-3" onClick={HandleShowSidebar}>
                    <i className="text-2xl font-semibold fa-solid fa-xmark"></i>
                </div>
            </div>

            {/* sidebar links */}
            <div className="nav-links-main  mt-[10px] p-6">
                <ul className="nav-links flex flex-col items-start gap-[40px]">
                    {
                        ShopNavLinks?.map((item) => {

                            return(
                                <li onClick={() =>{ HandleShowSidebar(); HandleNavigateFilters(item); } } className="text-xl font-medium tracking-[1px] "  key={item?.id +"sidebar"}><Link to={item?.url}>{item?.label}</Link></li>
                            )
                        })
                    }
                </ul>
            </div>

            {/* cart-acount-logout */}
            <div className="cart-account-logout mt-[10px] flex justify-center items-center gap-10">
                {/* cart */}
                <div onClick={() => {HandleShowSidebar(); HandleCartSidebar()}} className="icon relative border-2 border-gray-300 px-3 py-2 rounded-lg">
                    <i className="text-2xl font-semibold fa-solid fa-cart-shopping"></i>
                    <span className="absolute top-[-15px] right-0 text-lg font-medium">{cartItems?.items?.length || 0}</span>

                </div>
                {/* account */}
                <div onClick={() => {HandleShowSidebar(); navigate('/shop/account'); }} className="icon border-2 border-gray-300 px-3 py-2 rounded-lg">
                    <i className="text-2xl font-semibold fa-solid fa-circle-user"></i>               
                    </div>
                {/* Logout */}
                <div onClick={HandleUserLogout} className="icon border-2 border-gray-300 px-3 py-2 rounded-lg">
                    <i className="text-2xl font-semibold fa-solid fa-arrow-right-from-bracket"></i>                
                </div>
            </div>
        </div>
    </div>
    </>)
}
export default ShopMobileSidebar;