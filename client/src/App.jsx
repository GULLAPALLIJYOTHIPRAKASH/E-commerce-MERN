import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/Auth/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminLayout from "./components/Admin-View/AdminLayout";
import Dashboard from "./pages/Admin-View/Dashboard";
import Products from "./pages/Admin-View/Products";
import Orders from "./pages/Admin-View/Orders";
import Features from "./pages/Admin-View/Features";
import ShopLayout from "./components/Shopping-View/ShopLayout";
import Home from "./pages/Shopping-View/Home";
import ProductListing from "./pages/Shopping-View/ProductListing";
import Account from "./pages/Shopping-View/Account";
import Checkout from "./pages/Shopping-View/Checkout";
import UnAuthorize from "./pages/UnAuthorize/UnAuthorize";
import NotFound from "./pages/Not-Found/NotFound";
function App(){

  return(<>
  <Routes>

    {/* Auth routes */}
    <Route path="/auth" element={<AuthLayout/>}>
    <Route path="login" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
    </Route>

    {/* Admin routes */}
    <Route path="/admin" element={<AdminLayout/>}>
    <Route path="dashboard" element={<Dashboard/>}/>
    <Route path="products" element={<Products/>}/>
    <Route path="orders" element={<Orders/>}/>
    <Route path="features" element={<Features/>}/>
    </Route>


    {/* Shopping routes */}
    <Route path="/shop" element={<ShopLayout/>}>
    <Route path="home" element={<Home/>}/>
    <Route path="products" element={<ProductListing/>}/>
    <Route path="account" element={<Account/>}/>
    <Route path="checkout" element={<Checkout/>}/>
    </Route>

    {/* unAuthorize route */}
    <Route path="/unauth" element={<UnAuthorize/>}/>

    {/* Not found route */}

    <Route path="*" element={<NotFound/>}/>


  </Routes>
  </>)
}

export default App;