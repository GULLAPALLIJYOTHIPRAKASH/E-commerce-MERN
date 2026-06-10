import { Link } from "react-router-dom";
import { AdminMenu } from "../config/config";

const AdminSideBarIcon= [
{id:"dashboard" , icon:<i className="text-xl  mr-[2px] fa-solid fa-chart-pie"></i> },
{id:"products" , icon:<i className="text-xl  mr-[2px] fa-solid fa-basket-shopping"></i> },
{id:"orders" , icon:<i className="text-xl  mr-[2px] fa-solid fa-shapes"></i> },
{id:"features" , icon:<i className="text-xl  mr-[2px] fa-solid fa-clone"></i>},
]


function MobileSidebar({showSidebar , HandleSidebar}){

    
    return(<>
    <aside className={`sidebar-container w-[100%] h-[100vh] fixed top-0 ${showSidebar ? "left-0" : "left-[-100%]"} z-100 bg-black/30 transition-all duration-500 linear`}>
    <div className="sidebar-center w-[60vw] h-[100%] p-4 bg-white">
        <div className="heading p-4 w-[100%] flex justify-between items-center">
            <div className="logo-container" >
                <h1 className="text-lg font-medium "><i className="fa-solid fa-crown"></i> Admin Panel</h1>
                
            </div>
            <div className="close-icon" onClick={HandleSidebar}>
                <i className="text-xl font-medium fa-solid fa-xmark"></i>
            </div>
        </div>

            {/* Nav links start */}
        <div className="nav-links-main px-4  mt-8">
            <ul className="nav-links ">
              {
                AdminMenu?.map((item , idx) => {

                    return(

                        <li  className="nav-link text-gray-600 mb-8" key={item?.id + "_mobile"}>
                            <Link  onClick={HandleSidebar} to={`/admin/${item.id}`} className="text-lg font-normal">{AdminSideBarIcon[idx].icon} { item?.label}</Link>
                        </li>
                    )
                })
              }
            </ul>
        </div>
        {/* Nav links start */}
    </div>
    </aside>
    </>)
}

export default MobileSidebar;