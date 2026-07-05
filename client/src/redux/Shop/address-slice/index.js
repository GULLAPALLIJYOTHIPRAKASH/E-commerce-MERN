import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialObj = {

    isLoading:false,
    addressList:[]
}

// Add new Address
export const ShopAddAddress = createAsyncThunk('/api/shop/account/address/add' , async (FormData , {rejectWithValue}) => {

    try {
        
        const response = await axios.post("http://localhost:5000/api/shop/account/address/add", FormData , {withCredentials:true});

        return response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


// fetch all addresss
export const ShopGetAllAddress = createAsyncThunk('/api/shop/account/address/getaddress/userId' , async ({userId} , {rejectWithValue}) => {

    try {
        
        const response = await axios.get(`http://localhost:5000/api/shop/account/address/getaddress/${userId}` , {withCredentials:true});

        return response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


// edit address
export const ShopEditAddress  = createAsyncThunk('/api/shop/account/address/edit-address/userId/addressId' , async ({userId, addressId , formData}, {rejectWithValue}) => {

    try {
        
        const response = await axios.put(`http://localhost:5000/api/shop/account/address/edit-address/${userId}/${addressId}`, formData, {withCredentials:true});

        return response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


// delete address
export const ShopDeleteAddress = createAsyncThunk('/api/shop/account/address/delete-address/userId/addressId' , async ({userId, addressId}, {rejectWithValue}) => {

    try {
        
        const response = await axios.delete(`http://localhost:5000/api/shop/account/address/delete-address/${userId}/${addressId}`, {withCredentials:true});

        return response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


const ShopAddressSlice = createSlice({
    name:"Shop Address",
    initialState:initialObj,
    reducers:{},
    extraReducers:(builder) => {

        builder.addCase(ShopAddAddress.pending , (state) => {

            state.isLoading =true
        }).addCase(ShopAddAddress.fulfilled , (state,action) => {

            state.isLoading =false
        }).addCase(ShopAddAddress.rejected , (state,action) => {

            state.isLoading =false

        }).addCase(ShopGetAllAddress.pending , (state) => {

            state.isLoading =true
        }).addCase(ShopGetAllAddress.fulfilled , (state,action) => {

            state.isLoading =false
            state.addressList=action.payload.success ? action.payload.data : []
        }).addCase(ShopGetAllAddress.rejected , (state,action) => {

            state.isLoading =false
            state.addressList= []

        }).addCase(ShopEditAddress.pending , (state) => {

            state.isLoading =true
        }).addCase(ShopEditAddress.fulfilled , (state,action) => {

            state.isLoading =false
        }).addCase(ShopEditAddress.rejected , (state,action) => {

            state.isLoading =false

        }).addCase(ShopDeleteAddress.pending , (state) => {

            state.isLoading =true
        }).addCase(ShopDeleteAddress.fulfilled , (state,action) => {

            state.isLoading =false
        }).addCase(ShopDeleteAddress.rejected , (state,action) => {

            state.isLoading =false

        })

    }
});

export default ShopAddressSlice.reducer;
