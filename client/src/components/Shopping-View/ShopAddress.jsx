import AddressCard from "./AddressCard";

function ShopAddress({SubmitEditAddress , editAddress , HandleEdit, DeleteAddress , addressList , addressForm ,HandleAddressInput , SubmitAddress}){

    return(<>
    
    <div className="address-section mt-3 border-1 border-gray-300 rounded-md p-2">
        <h1 className="text-base font-normal">Address List</h1>
        {/* address card */}
        <AddressCard HandleEdit={HandleEdit} DeleteAddress={DeleteAddress} addressList={addressList}/>
        <form  onSubmit={ (e) => {editAddress?.status ? SubmitEditAddress(e) : SubmitAddress(e) }} className="address-form mt-4 border-1 border-gray-300 rounded-md p-4">
            <h1 className="text-base font-bold mb-2">{editAddress.status   ? "Edit a Address"  : "Add New Address"}</h1>
            {/* address */}
            <div className="field mt-1">
                <label htmlFor="address" className="text-[15px]  font-normal">Address</label>
                <input required value={addressForm.address} onChange={HandleAddressInput} className="w-[100%] inline-block mt-1 py-1 px-2  outline-none border-1 border-gray-400 rounded-md"  type="text" name="address" id="address" placeholder="Enter your address" />
            </div>
            {/* city */}
             <div className="field mt-1">
                <label htmlFor="city" className="text-[15px]  font-normal">City</label>
                <input required value={addressForm.city}  onChange={HandleAddressInput} className="w-[100%] inline-block mt-1 py-1 px-2  outline-none border-1 border-gray-400 rounded-md"  type="text" name="city" id="city" placeholder="Enter your city" />
            </div>
            {/* pincode */}
             <div className="field mt-1">
                <label htmlFor="pincode" className="text-[15px]  font-normal">Pincode</label>
                <input required value={addressForm.pincode} onChange={HandleAddressInput} className="w-[100%] inline-block mt-1 py-1 px-2  outline-none border-1 border-gray-400 rounded-md"  type="text" name="pincode" id="pincode" placeholder="Enter your pincode" />
            </div>
            {/* phone */}
             <div className="field mt-1">
                <label htmlFor="phone" className="text-[15px]  font-normal">Phone</label>
                <input required  min={10} max={10} value={addressForm.phone} onChange={HandleAddressInput} className="w-[100%] inline-block mt-1 py-1 px-2  outline-none border-1 border-gray-400 rounded-md"  type="tel" name="phone" id="phone" placeholder="Enter your phone" />
            </div>
            {/* notes */}
             <div className="field mt-1">
                <label htmlFor="notes" className="text-[15px]  font-normal">Notes</label>
                <textarea required  maxLength={100} value={addressForm.notes} onChange={HandleAddressInput} className="w-[100%] inline-block mt-1 py-1 px-2  outline-none border-1 border-gray-400 rounded-md"   name="notes" id="notes" placeholder="Enter your notes"></textarea>
            </div>

            {/* btn */}
            <button  className="add-btn mt-1 w-[100%] py-1 px-2 text-center bg-black text-white rounded-lg cursor-pointer hover:opacity-80 transition-all linear duration-300 ">{editAddress.status   ? "Edit a Address"  : "Add New Address"}</button>

        </form>

    </div>
    </>)
}

export default ShopAddress;