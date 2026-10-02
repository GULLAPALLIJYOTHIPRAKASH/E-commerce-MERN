import { Outlet } from "react-router-dom";
import Auth_bg from "../../assets/Auth-bg.jpg"

function AuthLayout(){

    return(<>
    <div className="auth-container w-[100%] h-[100vh] ">
        <div className="auth-center w-[100%] h-[100%] lg:flex ">
            <div style={{backgroundImage: `url(${Auth_bg})`}} className={`heading hidden text-center lg:block lg:flex lg:justify-center lg:items-center   w-[100%] h-[100%]  bg-cover bg-center bg-no-repeat text-white`}>
               <div className="">
                 <h1 className="text-2xl xl:text-4xl font-bold tracking-[1px] mb-2">Welcome to E-commerce Shopping</h1>
                <span className="text-lg  tracking-[1px]">Shop Smart, Live Better</span>
               </div>
            </div>
            <div className="section w-[100%] h-[100%] flex justify-center items-center">
                <Outlet/>
            </div>
        </div>
    </div>
    
    </>)
}

export default AuthLayout;