import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth-slice/index";
import AdminProductsReducer from "./Admin/product-slice/index";
import AdminDashboardReducer from "./Admin/dashboard-slice/index";
import ShopProductReducer from "./Shop/product-slice/index";
import ShopHomeReducer from "./Shop/home-slice/index";
import ShopCartReducer from "./Shop/cart-slice/index";
import ShopAdressReducer from "./Shop/address-slice/index";
import ShopOrderReducer from "./Shop/order-slice/index";
import AdminOrderReducer from "./Admin/order-slice/index";
import ShopSearchReducer from "./Shop/search-slice/index";
import ShopReviewReducer from "./Shop/review-slice/index";

const store = configureStore({
    reducer: {

        auth:AuthReducer,
        AdminProducts:AdminProductsReducer,
        AdminDashboard:AdminDashboardReducer,
        ShopProduct:ShopProductReducer,
        ShopHomePage:ShopHomeReducer,
        ShopCart:ShopCartReducer,
        ShopAddress:ShopAdressReducer,
        ShopOrder:ShopOrderReducer,
        AdminOrder:AdminOrderReducer,
        ShopSearch:ShopSearchReducer,
        ShopReview:ShopReviewReducer,

    }
});

export default store;