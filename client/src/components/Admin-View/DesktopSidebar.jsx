import { Link } from "react-router-dom";
import { AdminMenu } from "../config/config";

const AdminSideBarIcon= [
{id:"dashboard" , icon:<i className="text-xl group-hover:text-2xl transition-all linear duration-300  mr-[2px] fa-solid fa-chart-pie"></i> },
{id:"products" , icon:<i className="text-xl  group-hover:text-2xl transition-all linear duration-300 mr-[2px] fa-solid fa-basket-shopping"></i> },
{id:"orders" , icon:<i className="text-xl  group-hover:text-2xl transition-all linear duration-300  mr-[2px] fa-solid fa-shapes"></i> },
{id:"features" , icon:<i className="text-xl group-hover:text-2xl transition-all linear duration-300  mr-[2px] fa-solid fa-clone"></i>},
]
function DesktopSidebar(){

    return(<>
    <aside className="sidebar-container  w-[100%] min-h-[100vh]">
        <div className="sidebar-center  w-[100%] h-[100%]">
            <div className="heading p-6 pb-[20px] border-b-1 border-gray-300 ">
                <div className="logo-section text-center">
                <h1 className="text-lg font-bold "><i className="fa-solid fa-crown"></i> Admin Panel</h1>
                </div>
            </div>
             {/* Nav links start */}
        <div className="nav-links-main p-6">
            <ul className="nav-links ">
              {
                AdminMenu?.map((item , idx) => {

                    return(

                        <li  className="nav-link text-gray-600 mb-8 group transition-all linear duration-500" key={item?.id + "_mobile"}>
                            <Link to={`/admin/${item.id}`} className="block w-[100%] text-lg font-normal p-2 group-hover:bg-gray-50 group-hover:rounded-lg ">{AdminSideBarIcon[idx].icon} { item?.label}</Link>
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

export default DesktopSidebar;