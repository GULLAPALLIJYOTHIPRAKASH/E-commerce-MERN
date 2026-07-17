import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { RegisterUser } from "../../redux/auth-slice";
import {toast} from "react-toastify"

function Register(){

    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle register submit
    const HandleRegisterSubmit =  async (e) => {
        e.preventDefault();

       if(username.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0){

        try {
            


            const response = await dispatch(RegisterUser({username , email , password})).unwrap();


            if(response.success){

                // rest all inputs
                setEmail("");
                setPassword("");
                setUsername("");

                toast("User Registered Successfully" , {
                    toastId:"user register"
                });

                // move to 
                navigate("/auth/login");
            }

        } catch (error) {

            console.log(error);
            
            
        }

       }
        
    }

    return(<>
    <div className="register-container w-[100%] ">
        <div className="register-center p-4 mx-auto">
            <div className="heading text-center font-heading">
                <h1 className="text-2xl lg:text-3xl font-bold pb-2">Create new account</h1>
                <h3 className="text-lg tracking-[1px] text-gray-500">Already have an account <Link to="/auth/login" className="text-gray-600 font-medium outline-none">Login</Link></h3>
            </div>
            <section className="form-section flex flex-col items-center  mt-6">
                <form onSubmit={HandleRegisterSubmit} className="register-form w-[100%] max-w-[600px] ">
                    {/* Username */}
                    <div className="field mb-3">
                        <label htmlFor="username" className="text-base font-medium  tracking-[1px] cursor-pointer ">Username</label>
                        <input minLength={3} value={username} onChange={(e) => setUsername(e.target.value)} required className="w-[100%] mt-1 block p-2 border-2 border-gray-200 rounded-lg outline-none" type="text" name="username" id="username" placeholder="Enter a Username" />
                    </div>
                    
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
                    <button className="w-[100%] bg-black text-white text-lg p-2 rounded-lg cursor-pointer transition-all linear duration-300 hover:opacity-70">Sign Up</button>
                </form>
            </section>
        </div>
    </div>
    </>)
}

export default Register;