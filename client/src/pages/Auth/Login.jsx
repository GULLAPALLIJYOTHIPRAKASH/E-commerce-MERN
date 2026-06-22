import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginUser } from "../../redux/auth-slice";
import {useDispatch} from "react-redux";
import { toast } from "react-toastify";


function Login(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("123456789");
    const dispatch = useDispatch();

    // handle login submit
    const HandleLoginSubmit = async (e) => {
        e.preventDefault();
        
        
        if( email.trim().length > 0 && password.trim().length > 0){
            
            try {
                   
       
       
                   const response = await dispatch(LoginUser({email , password})).unwrap();
       
       
                   if(response?.success){
       
                       // rest all inputs
                       setEmail("");
                       setPassword("");
       
                       toast.success("User Login Successfully" , {
                           toastId:"user login"
                       });  
       
               }
               
            
            } catch (error) {
       
                   console.log(error.message);

       
                       toast(`${error.message}` , {
                           toastId:"user_login_failed"
                       }); 
                   
                   
               }
       
              }
               
           }
        
    

    return(<>
    <div className="login-container w-[100%] ">
        <div className="login-center p-4 mx-auto">
            <div className="heading text-center font-heading">
                <h1 className="text-2xl lg:text-3xl font-bold pb-2">Sign in to your account</h1>
                <h3 className="text-lg tracking-[1px] text-gray-500">Don't have an account <Link to="/auth/register" className="text-gray-600 font-medium outline-none">Register</Link></h3>
            </div>
            <section className="form-section flex flex-col items-center  mt-6">
                <form onSubmit={HandleLoginSubmit} className="login-form w-[100%] max-w-[600px] ">
                    
                    {/* Email */}
                     <div className="field mb-3">
                        <label htmlFor="email" className="text-base font-medium  tracking-[1px] cursor-pointer ">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-[100%] mt-1 block p-2 border-2 border-gray-200 rounded-lg outline-none" type="email" name="email" id="email" placeholder="Enter a Email" />
                    </div>

                    {/* Password */}
                     <div className="field mb-3">
                        <label htmlFor="password" className="text-base font-medium  tracking-[1px] cursor-pointer ">Password</label>
                        <input minLength={9} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-[100%] mt-1 block p-2 border-2 border-gray-200 rounded-lg outline-none" type="password" name="email" id="password" placeholder="Enter a Password" />
                    </div>
                    <button className="w-[100%] bg-black text-white text-lg p-2 rounded-lg cursor-pointer transition-all linear duration-300 hover:opacity-70">Login</button>
                </form>
            </section>
        </div>
    </div>
    </>)
}
export default Login;