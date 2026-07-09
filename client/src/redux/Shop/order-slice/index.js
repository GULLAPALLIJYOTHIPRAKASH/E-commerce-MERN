import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from "axios"

const initialObj = {

    isLoading:false,
    approval_url:"",
    orderId:"",
    ordersList:[],
    orderDetails:null
}

// Create Order
export const ShopCreateOrder = createAsyncThunk("/api/shop/order/create" , async(formdata , {rejectWithValue}) => {

    try {
        
        const response = await axios.post('http://localhost:5000/api/shop/order/create' , formdata , {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
})


// capture order
export const ShopCaptureOrder = createAsyncThunk("/api/shop/order/create" , async(formdata , {rejectWithValue}) => {

    try {
        
        const response = await axios.post('http://localhost:5000/api/shop/order/capture-order' , formdata , {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
})

const ShopOrderSlice = createSlice({
    name:"ShopOrders",
    initialState:initialObj,
    reducers:{},
    extraReducers: (builder) => {

        builder.addCase(ShopCreateOrder.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopCreateOrder.fulfilled , (state,action) => {

            state.isLoading=false,

            state.approval_url = action.payload.approval_url,
            state.orderId= action.payload.orderId
            // store orderId
            sessionStorage.setItem("orderId" , JSON.stringify( action.payload.orderId));
        }).addCase(ShopCreateOrder.rejected , (state,action) => {

            state.isLoading=false,

            state.approval_url = "",
            state.orderId=""
        })

    }
});

export default ShopOrderSlice.reducer;