function AddressCard({HandleEdit , DeleteAddress , addressList}){

    return(
        <div className="address-list  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                addressList && addressList.length > 0 && addressList?.map((item) => {

                    return(
                        <article  key={item._id + "address"} className="w-[100%] bg-white shadow-md border-1 border-gray-400 rounded-lg p-4">
                            <h1 className="text-sm font-normal line-clamp-1"><span>Address :</span> {item?.address}</h1>
                            <h1 className="text-sm font-normal line-clamp-1"><span>City :</span> {item?.city}</h1>
                            <h1 className="text-sm font-normal line-clamp-1"><span>Pincode :</span> {item?.pincode}</h1>
                            <h1 className="text-sm font-normal line-clamp-1"><span>Phone :</span> {item?.phone}</h1>
                            <h1 className="text-sm font-normal line-clamp-1"><span>Notes :</span> {item?.notes}</h1>
                            <div className="btn-container flex justify-between items-center mt-2">
                                <button onClick={() => {HandleEdit(item?._id)}} className="text-base text-white bg-black rounded-lg px-2 py-1 hover:opacity-70 cursor-pointer transition-all linear duration-300">Edit</button>
                                <button onClick={() => DeleteAddress(item?._id)} className="text-base text-white bg-black rounded-lg px-2 py-1 hover:opacity-70 cursor-pointer transition-all linear duration-300">Delete</button>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default AddressCard;