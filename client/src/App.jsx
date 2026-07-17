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
import Paypal_Return from "./pages/Shopping-View/Paypal_Return";
import Paypal_Cancel from "./pages/Shopping-View/Paypal_Cancel";
import Checkout from "./pages/Shopping-View/Checkout";
import UnAuthorize from "./pages/UnAuthorize/UnAuthorize";
import NotFound from "./pages/Not-Found/NotFound";
import CheckAuth from "./components/common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CheckAuthUser } from "./redux/auth-slice";
import PaymentSuccess from "./pages/Shopping-View/PaymentSuccess";
import Search from "./pages/Shopping-View/Search";
function App(){

 const dispatch = useDispatch();
 const {isAuthenticated , isLoading , user} = useSelector((state) => state.auth);

 useEffect(() => {

    const checkuser = async() => {

      try {
        
        await dispatch(CheckAuthUser()).unwrap();
      } catch (error) {
        
        console.log(error);
        
      }
    }

    checkuser();

 },[dispatch]);


 if(isLoading){

  return(<h1 className="text-3xl font-medium">Loading...</h1>)
 }

 
  return(<>
  <Routes>


    <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated}  user={user}></CheckAuth>} />

    {/* Auth routes */}
    <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated}  user={user}><AuthLayout/></CheckAuth>}>
    <Route path="login" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
    </Route>

    {/* Admin routes */}
    <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated}  user={user}><AdminLayout/> </CheckAuth>}>
    <Route path="dashboard" element={<Dashboard/>}/>
    <Route path="products" element={<Products/>}/>
    <Route path="orders" element={<Orders/>}/>
    <Route path="features" element={<Features/>}/>
    </Route>


    {/* Shopping routes */}
    <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated}  user={user}><ShopLayout/> </CheckAuth>}>
    <Route path="home" element={<Home/>}/>
    <Route path="products" element={<ProductListing/>}/>
    <Route path="account" element={<Account/>}/>
    <Route path="checkout" element={<Checkout/>}/>
    <Route path="paypal-cancel" element={<Paypal_Cancel/>}/>
    <Route path="paypal-return" element={<Paypal_Return/>}/>
    <Route path="payment-success" element={<PaymentSuccess/>}/>
    <Route path="search" element={<Search/>}/>
    </Route>

    {/* unAuthorize route */}
    <Route path="/unauth" element={<UnAuthorize/>}/>

    {/* Not found route */}

    <Route path="*" element={<NotFound/>}/>


  </Routes>
  </>)
}

export default App;