import { useEffect, useState } from "react";
import account_Img from "../../assets/account.jpg";
import ShopAddress from "../../components/Shopping-View/ShopAddress";
import {useDispatch, useSelector} from "react-redux"
import { ShopAddAddress, ShopDeleteAddress, ShopEditAddress, ShopGetAllAddress } from "../../redux/Shop/address-slice";
import {toast} from "react-toastify";
import ShopOrders from "../../components/Shopping-View/ShopOrders";
import OrderDetailView from "../../components/Shopping-View/OrderDetailView";
import { reset_order_details, ShopOrderDetails, ShopOrdersList } from "../../redux/Shop/order-slice";

const address_Form = {
        address:"",
        city:"",
        pincode:"",
        phone:"",
        notes:""
}
const edit_address={
        status:false,
        addressId:""
}

function Account(){

    const[tab , setTab] = useState("orders");

    const [addressForm , setAddressForm] = useState(address_Form);
    const [editAddress , setEditAddress]= useState(edit_address);


    // address redux
    const {addressList} = useSelector((state) => state.ShopAddress);
    const dispatch = useDispatch();
    // user redux
    const {user}  = useSelector((state) => state.auth);

    const [showOrderDetail , setShowOrderDetail] =useState(false);

    // order redux
    const {ordersList, orderDetails} = useSelector((state) => state.ShopOrder);


    // Handle orders/address
    const HandleTabSwitch = (type) => {

        // console.log(type);
        

        setTab(type);
    }


    // Handle Inputs
    const HandleAddressInput = (e) => {

        const name = e.target.name;
        const val = e.target.value;

        setAddressForm({
            ...addressForm,
            [name]:val
        })
    }


    // Submit address
    const SubmitAddress = async (e) => {

        e.preventDefault();

        try {

            if(addressList.length <3){

                
                const response = await dispatch(ShopAddAddress({...addressForm , userId:user?.id})).unwrap();
                
                if(response.success){

                    // refetch
                    dispatch(ShopGetAllAddress({userId:user?.id}))
                    
                    // reset
                    setAddressForm(address_Form);


                    toast.success("Address added Successfully",{
                        toastId:"NewAddress"
                    })




                }

            }else{

                toast.info("Only 3 address can be added.");

                setAddressForm(address_Form);
            }
            
            
        } catch (error) {
            
        }
        
        
    }


    // Delete address
    const DeleteAddress = async (addressId) => {



        try {
            
            const response = await dispatch(ShopDeleteAddress({userId: user?.id , addressId})).unwrap();

            if(response.success){

                // refetch
                dispatch(ShopGetAllAddress({userId:user?.id}));

                // reset
                setAddressForm(address_Form);


                toast.success("Address Delete Successfuly",{
                toastId:"deleteAddress"
            })

            }
        } catch (error) {
            
        }
    }


    // handleEdit address
    const HandleEdit = (addressId) => {

        const address = addressList?.find((item) => item._id === addressId);
        
        
        setEditAddress({
            status:true,
            addressId:addressId
        })

        setAddressForm({

            ...address

        })

    }


    // Submit edit address
    const SubmitEditAddress = async (e) => {

        console.log("edit done");
        

        e.preventDefault();

        try {

            
            const formData = {

                address:addressForm.address,
                city:addressForm.city,
                pincode:addressForm.pincode,
                phone:addressForm.phone,
                notes:addressForm.notes,
                userId:addressForm.userId

            }
            
            
            const response = await dispatch(ShopEditAddress({userId:user?.id, addressId:editAddress.addressId , formData})).unwrap();

            console.log(response);
            
            if(response.success){

                // refetch
                dispatch(ShopGetAllAddress({userId:user?.id}))

                // reset
                setAddressForm(address_Form);
                setEditAddress(edit_address);

                toast.success("Address Edited Successfully", {
                    toastId:"EditAddress"
                })
            }
        } catch (error) {
            
        }
    }

    // fetch all address
    useEffect(() =>{

        if(tab === "address"){
        dispatch(ShopGetAllAddress({userId:user?.id}))

        }

    },[tab , dispatch])


    // show/hide order detail
    const HanldeOrderDetails = async (orderId="",userId="") =>{

        // set T/F
        setShowOrderDetail(!showOrderDetail);

        if(!showOrderDetail){

            const response = await dispatch(ShopOrderDetails({orderId, userId})).unwrap()

            console.log(response);
            

            
        }else{
            
            
            // reset order detail state
            dispatch(reset_order_details());

        }
        

    }

    // fetch all orders
    useEffect(() => {

        if(tab === "orders"){

            dispatch(ShopOrdersList(user?.id))
        }

    },[tab , dispatch])



    return(<>
    <div className="account-container">
        <div className="account-center">
            {/* Banner Image */}
            <div className="img-container w-[100%] h-auto lg:h-[250px] overflow-hidden object-center object-cover">
                <img className="w-[100%] h-[100%] overflow-hidden object-center object-cover" src={account_Img} alt="Account banner" />
            </div>

            <section className="account-section p-2 mt-5">
                <div className="border-1 border-gray-300 p-4 rounded-md">
                {/* Tabs */}
                <div className="tab-section w-[200px] flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                    <h1 onClick={() => HandleTabSwitch("orders")} className={`text-base   ${tab === "orders" ?  "bg-white font-medium" : "font-normal"}  hover:font-medium transition-all linear duration-300 text-black px-2 py-1 rounded-lg cursor-pointer `}>Orders</h1>
                    <h1 onClick={() => HandleTabSwitch("address")} className={`text-base  ${tab === "address" ? "bg-white font-medium" : "font-normal"}  hover:font-medium transition-all linear duration-300 text-black px-2 py-1 rounded-lg cursor-pointer `}>Address</h1>
                </div>

                {/* Shop Orders */}
                {
                    tab === "orders" && <ShopOrders ordersList={ordersList}  HanldeOrderDetails={HanldeOrderDetails}/>
                }

                {/* Address Section */}
                {
                    tab === "address" &&  <ShopAddress SubmitEditAddress={SubmitEditAddress} editAddress={editAddress} HandleEdit={HandleEdit} DeleteAddress={DeleteAddress} addressList={addressList} addressForm={addressForm} HandleAddressInput={HandleAddressInput} SubmitAddress={SubmitAddress}/>
                }
                </div>
            </section>

        </div>
    </div>
    

    {/* Order detail view */}
    <OrderDetailView orderDetails={orderDetails} showOrderDetail={showOrderDetail} HanldeOrderDetails={HanldeOrderDetails}/>
    </>)
}

export default Account;