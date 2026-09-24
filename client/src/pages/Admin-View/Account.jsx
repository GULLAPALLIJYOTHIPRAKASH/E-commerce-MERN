import { useEffect } from "react";
import AdminUserTable from "../../components/Admin-View/AdminUserTable";
import {useDispatch, useSelector} from "react-redux"
import { AdminDeleteAccount, AdminGetAllUsers } from "../../redux/Admin/account-slice";
import {toast} from "react-toastify";

function Account(){

    const dispatch = useDispatch();
    const {user_accounts} = useSelector((state) => state.AdminAccount)

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
                    id:"userAccountDelete"
                });

                dispatch(AdminGetAllUsers());

            }
            
        } catch (error) {

            console.log(error.message);
            
            
        }
    }
    return(<>
    <div className="account-container">
        <div className="account-center">
            <div className="heading">
                <h1 className="text-base font-normal">All Users Account : {user_accounts.length}</h1>
            </div>

            {/* user Table */}
            <AdminUserTable HandleDeleteUser={HandleDeleteUser} user_accounts={user_accounts}/>
        </div>
    </div>
    </>)
}

export default Account;