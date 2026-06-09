
import {Outlet} from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import {useDispatch} from "react-redux"
import { LogoutUser } from "../../redux/auth-slice";
import {toast} from "react-toastify";
function AdminLayout(){

    const[showSidebar , setShowSidebar] = useState(false);

    const dispatch = useDispatch()

    // Show/hide Sidebar
    const HandleSidebar = () => {

        setShowSidebar(!showSidebar);
    }


    // Handle Logout 
    const HandleLogout = async () => {

        try {
            
            const response = await dispatch(LogoutUser()).unwrap();

            if(response.success){

                toast("Logout Successfully", {
                    toastId:"logout"
                })
            }
        } catch (error) {

            console.log(error);
            
            
        }
    }

    

    return(<>
    <div className="admin-container w-[100%] min-h-[100vh]">
        <div className="admin-center w-[100%] h-[100%] md:flex">

            {/* desktop sidebar start*/}
            <div className="sidebar-content hidden md:block md:w-[30%] lg:w-[20%] border-r-1 border-gray-300">
                <DesktopSidebar/>
            </div>
            {/* desktop sidebar end*/}

            {/* main contain */}
            <div className="main-content w-[100%] h- md:w-[70%] lg:w-[80%] ">
                <nav className="navbar-container w-[100%] min-h-[50px] border-b-1 border-gray-300 ">
                    <div className="navbar-center w-[100%] h-[100%] p-4 flex justify-between items-center ">
                        <div className="hamburger bg-black py-2 px-3 rounded-lg md:invisible" onClick={HandleSidebar}>
                            <i className="text-xl text-white  fa-solid fa-bars"></i>
                        </div>
                        <div className="logout-btn " >
                            <button onClick={HandleLogout} className="px-2 py-2 bg-black text-white text-sm rounded-lg cursor-pointer hover:opacity-80 transition-all linear duration-300"><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                        </div>
                    </div>
                    
                </nav>
                <div className="page-content p-6">
                     <Outlet/>
                </div> 
            </div>


        </div>
    </div>

    {/* MobileSidebar start */}
    <MobileSidebar showSidebar={showSidebar} HandleSidebar={HandleSidebar} />
    {/* MobileSidebar end */}
    
    

    </>)
}

export default AdminLayout;