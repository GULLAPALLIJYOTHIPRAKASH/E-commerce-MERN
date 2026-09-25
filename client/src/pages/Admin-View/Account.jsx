import { useEffect, useState } from "react";
import AdminUserTable from "../../components/Admin-View/AdminUserTable";
import {useDispatch, useSelector} from "react-redux"
import { AdminDeleteAccount, AdminGetAllUsers } from "../../redux/Admin/account-slice";
import {toast} from "react-toastify";
import AdminCreateUser from "../../components/Admin-View/AdminCreateUser";

function Account(){

    const dispatch = useDispatch();
    const {user_accounts} = useSelector((state) => state.AdminAccount);
    const [showpopup , setShowPopup] = useState(false);

    // fetch all user 
    useEffect(() => {

        dispatch(AdminGetAllUsers());

    },[dispatch]);

    // delete user account
    const HandleDeleteUser= async (userId) => {

        try {
            
            const response = await dispatch(AdminDeleteAccount(userId)).unwrap();


            if(response?.success){

                toast.success("User Deleted Successfuly.", {
                    toastId:"userAccountDelete"
                });

                dispatch(AdminGetAllUsers());

            }
            
        } catch (error) {

            console.log(error.message);
            
            
        }
    }


    // show/hide popup
    const HandleShowPopUp = (id="" ,username="" , email="" , role="" ) => {

        setShowPopup(!showpopup);
    }
    return(<>
    <div className="account-container">
        <div className="account-center">
            <div className="heading mb-5 flex justify-between items-center">
                <h1 className="text-base font-normal">All Users Account : {user_accounts.length}</h1>
                <button onClick={HandleShowPopUp} className="bg-black text-white px-3 py-1 text-base cursor-pointer hover:opacity-80 rounded-lg transition-all ease-linear duration-100">Add a Create</button>
            </div>

            {/* user Table */}
            <AdminUserTable HandleShowPopUp={HandleShowPopUp} HandleDeleteUser={HandleDeleteUser} user_accounts={user_accounts}/>

            <AdminCreateUser HandleShowPopUp={HandleShowPopUp} showpopup={showpopup}/>
        </div>
    </div>
    </>)
}

export default Account;