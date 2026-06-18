import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth-slice/index";
import AdminProductsReducer from "./Admin/product-slice/index";
import AdminDashboardReducer from "./Admin/dashboard-slice/index";

const store = configureStore({
    reducer: {

        auth:AuthReducer,
        AdminProducts:AdminProductsReducer,
        AdminDashboard:AdminDashboardReducer,

    }
});

export default store;