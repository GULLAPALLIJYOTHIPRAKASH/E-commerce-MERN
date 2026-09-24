function AdminUserTable({HandleDeleteUser , user_accounts}){

    return(<>
    <div className="user-table-container mt-3">
        <table className="user-table w-[100%] table-auto overflow-auto   border-collapse ">
            <thead>
            <tr className="bg-gray-50  border border-gray-400 rounded-lg">
                <th className="p-2 text-sm text-gray-500 font-medium ">User Id</th>
                <th className="p-2 text-sm text-gray-500 font-medium ">User Name</th>
                <th className="p-2 text-sm text-gray-500 font-medium ">Email</th>
                <th className="p-2 text-sm text-gray-500 font-medium ">Role</th>
                <th className="p-2 text-sm text-gray-500 font-medium ">Edit</th>
            </tr>
            </thead>

            <tbody className="text-center">
                {
                    user_accounts.length > 0 && 
                    user_accounts.map((item) => {

                        return(
                    <tr className="border-1 border-gray-400 rounded-lg hover:bg-gray-50 transition-all ease-in duration-100">
                    <td className="p-2">{item?._id}</td>
                    <td className="p-2">{item?.username}</td>
                    <td className="p-2">{item?.email}</td>
                    <td className="p-2 text-white"><span className={`px-2 py-1 text-xs rounded-full ${item?.role === "seller" ? "bg-green-500" : item?.role === "user" ?  "bg-blue-500" :  "bg-red-500" }`}>{item?.role}</span></td>
                    <td className="p-2 flex justify-center items-center gap-2">
                        <span onClick={() => HandleDeleteUser(item?._id)} title="Delete user">
                            <i className="text-base text-red-500 hover:text-red-400 transition-all ease-linear duration-100 cursor-pointer fa-solid fa-trash-can"></i>
                        </span>
                    <span title="Edit user role">
                    <i className="text-base text-violet-400 hover:text-violet-500 transition-all ease-linear duration-100 cursor-pointer fa-solid fa-pen-to-square"></i>
                    </span>
                    </td>
                </tr>

                        )
                    })
                }
               
                

                
                
                
            </tbody>

        </table>

    </div>
    </>)
}

export default AdminUserTable;