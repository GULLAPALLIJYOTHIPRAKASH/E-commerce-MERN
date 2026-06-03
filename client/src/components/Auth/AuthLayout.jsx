import { Outlet } from "react-router-dom";

function AuthLayout(){

    return(<>
    <div className="auth-container w-[100%] h-[100vh] ">
        <div className="auth-center w-[100%] h-[100%] lg:flex ">
            <div className="heading hidden text-center lg:block lg:flex lg:justify-center lg:items-center  w-[100%] h-[100%] bg-black text-white">
                <h1 className="text-2xl xl:text-5xl font-bold tracking-[1px]">Welcome to E-commerce Shopping</h1>
            </div>
            <div className="section w-[100%] h-[100%] flex justify-center items-center">
                <Outlet/>
            </div>
        </div>
    </div>
    
    </>)
}

export default AuthLayout;