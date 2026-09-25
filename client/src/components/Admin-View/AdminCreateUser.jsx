import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminGetAllUsers } from "../../redux/Admin/account-slice";
import { toast } from "react-toastify";
import axios from "axios";

function AdminCreateUser({HandleShowPopUp , showpopup}){

     const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const[role , setRole]=useState(false);
    const [password , setPassword] = useState("");
    const dispatch = useDispatch();
    const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL
    
    // handle register submit
    const HandleRegisterSubmit =  async (e) => {
        e.preventDefault();

        

       if(username.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0){

        try {
            


            
            const response = await axios.post(`${BackendAPI_URL}/api/auth/register` ,{username , email , role , password}, {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
            
        })

        
            if(response?.data.success){
                
                    // rest all inputs
                setEmail("");
                setPassword("");
                setUsername("");
                setRole(false);

                toast.success("User Created Successfully" , {
                    toastId:"user register"
                });

                HandleShowPopUp();

                // refetch new users
                dispatch(AdminGetAllUsers());


                
            }

        } catch (error) {

            console.log(error);
            
            
        }

       }
        
    }


    return(<>
    <div className={`admin-create-user-container w-[100%] h-[100%] fixed  top-0 ${showpopup ? "left-0" : "left-[100%]"} flex justify-end   bg-black/30 transition-all ease-linear duration-500`}>
        <div className="admin-create-user-center w-[50vw] md:w-[35vw] lg:w-[30vw] min-h-[100vh] bg-white p-4">
            <div className="heading mt-2 flex justify-between items-center">
            <h1 className="text-base font-normal">Create New User</h1>
            <span onClick={HandleShowPopUp} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></span>
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

                    {/* seller */}
                     <div className="field mb-3 flex justify-start items-center">
                        <input checked={role} onChange={(e) => setRole(e.target.checked)} type="checkbox" name="seller" id="seller" className="w-4 h-4 accent-blue-500 hover:accent-blue-600 transition-all ease-linear duration-100" />
                        <label htmlFor="seller" className="text-base font-medium   cursor-pointer ml-1">I am a seller ?</label>
                    </div>
                    <button className="w-[100%] bg-black text-white text-lg p-2 rounded-lg cursor-pointer transition-all linear duration-300 hover:opacity-70">Create a User</button>
                </form>
            </section>
        </div>

    </div>
    </>)
}
export default  AdminCreateUser;