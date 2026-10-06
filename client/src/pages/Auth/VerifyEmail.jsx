import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { ReSendOTP, VerifyEmailAccount } from "../../redux/auth-slice";
import {toast} from "react-toastify"

function VerifyEmail(){

    const [email , setEmail] = useState("");
    const [verify_otp , setVerifyOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[showPopUp , setShowPopUp]=useState(false);
    const{isLoading } = useSelector((state) => state.auth);

    // handle verify email submit
    const HandleVerifyEmail =  async (e) => {
        e.preventDefault();

        

       if( email.trim().length > 0 && /^\d{6}$/.test(verify_otp)){

        try {
            


            const response = await dispatch(VerifyEmailAccount({email , verify_otp})).unwrap();


            if(response?.success){

                // rest all inputs
                setEmail("");
                setVerifyOtp("");
               

                toast.success("User Email Verifed Successfully" , {
                    toastId:"user verify"
                });


                // auth/login
                navigate("/auth/login");
            }

        } catch (error) {

            console.log(error);
            
            
            if(error?.message == "OTP expired"){


                setShowPopUp(true);

            }
            if(error?.message == "Invalid OTP"){

                toast.warn(error?.message , {
                    toastId:"invaild otp"
                })
            }
            
        }

       }
        
    }


    // resend Otp
    const HandleResendOTP= async() => {

        try {
            
            const response = await dispatch(ReSendOTP(email)).unwrap();

            if(response?.success){

                // reset only otp
                setVerifyOtp("");
                setShowPopUp(false);

                toast.success(response?.message , {
                    toastId:"success resend"
                })

            }
        } catch (error) {

            toast.error(error?.message,{toastId:"resend error"})
            
        }
    }

   

    return(<>
    <div className="register-container w-[100%] ">
        <div className="register-center p-4 mx-auto">
            <div className="heading text-center font-heading">
                <h1 className="text-2xl lg:text-3xl font-bold pb-2">Verify new account</h1>
                <h3 className="text-lg tracking-[1px] text-gray-500">Already have an account <Link to="/auth/login" className="text-gray-600 font-medium outline-none">Login</Link></h3>
            </div>
            <section className="form-section flex flex-col items-center  mt-6">
                <form onSubmit={HandleVerifyEmail} className="register-form w-[100%] max-w-[600px] ">
                
                    
                    {/* Email */}
                     <div className="field mb-3">
                        <label htmlFor="email" className="text-base font-medium  tracking-[1px] cursor-pointer ">Enter Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-[100%] mt-1 block p-2 border-2 border-gray-200 rounded-lg outline-none" type="email" name="email" id="email" placeholder="Enter a Email" />
                    </div>

                     {/* opt */}
                    <div className="field mb-3">
                        <label htmlFor="opt" className="text-base font-medium  tracking-[1px] cursor-pointer ">Enter OTP</label>
                        <input minLength={6} maxLength={6} value={verify_otp} onChange={(e) => setVerifyOtp(e.target.value)} required className="w-[100%] mt-1 block p-2 border-2 border-gray-200 rounded-lg outline-none" type="text" name="username" id="username" placeholder="Enter a Username" />
                    </div>

                   
                    <button disabled={isLoading} className="w-[100%] bg-black text-white text-lg p-2 rounded-lg cursor-pointer transition-all linear duration-300 hover:opacity-70">{isLoading ? "Verify Email ..." :"Verify Account"}</button>
                </form>
            </section>
        </div>
    </div>

    <div className={`resend-container fixed top-0 ${showPopUp ? "left-0 " : "left-[100%]" } w-[100%] h-[100%] bg-black/30 flex justify-center items-center transition-all duration-300 ease-linear`}>
        <div className="center w-[200px] bg-white p-4">
            <p className="text-right text-base"><i onClick={() => setShowPopUp(!showPopUp)} className="fa-solid fa-xmark cursor-pointer"></i></p>
            <h1 className="text-lg font-normal my-3">Your is OTP expired</h1>
            <button onClick={HandleResendOTP} disabled={isLoading} className="text-white w-[100%] bg-black py-1 px-2 text-base rounded-lg cursor-pointer">Resend</button>
        </div>
    </div>

    </>)
}

export default VerifyEmail;