import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader";

function ShopLayout(){

    return(<>
    <div className="shop-container">
    <div className="shop-center">
        <ShopHeader/>
        <Outlet/>
    </div>
    </div>

    </>)
}

export default ShopLayout;