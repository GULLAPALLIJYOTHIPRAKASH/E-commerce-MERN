import {Navigate, useLocation} from "react-router-dom";

function CheckAuth({isAuthenticated ,user , children }) {

    
    const location = useLocation();

    

    if(location.pathname === "/"){

        if(!isAuthenticated){

        return <Navigate to='/auth/login' />
    }else{

        if(user?.role === "admin"){

            return <Navigate to='/admin/dashboard' />
        }
        else if(user?.role === "seller"){

            return <Navigate to='/seller/dashboard' />
        }
        
        else{

            return  <Navigate to='/shop/home' />
        }

        
    }

    }


    if(!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))){

        return <Navigate to='/auth/login' />
    }

    if(isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){

        if(user?.role === "admin"){

            return <Navigate to='/admin/dashboard' />
        }
        else if(user?.role === "seller"){

            return <Navigate to='/seller/dashboard' />
        }
        
        else{

            return  <Navigate to='/shop/home' />
        }
    }

    // user
    if(isAuthenticated &&  user?.role === "user"  && location.pathname.includes('/admin')){

        return <Navigate to="/unauth" />
        
    }

    // admin
    if(isAuthenticated &&  user?.role === "admin"  && location.pathname.includes('/shop')){

        return <Navigate to="/admin/dashboard" />
        
    }

    // seller
    if(isAuthenticated &&  user?.role === "seller"  && location.pathname.includes('/shop')){

        return <Navigate to="/seller/dashboard" />
        
    }


    return( <>{children}</>)

}

export default CheckAuth;