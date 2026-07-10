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
export const ShopCaptureOrder = createAsyncThunk("/api/shop/order/captureorder" , async(formdata , {rejectWithValue}) => {

    try {
        
        const response = await axios.post('http://localhost:5000/api/shop/order/capture-order' , formdata , {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
})

// order List
export const ShopOrdersList =  createAsyncThunk("/api/shop/order/allorders/userId" , async(userId , {rejectWithValue}) => {

    try {
        
        const response = await axios.get(`http://localhost:5000/api/shop/order/allorders/${userId}`  , {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
})

// order Details
export const ShopOrderDetails = createAsyncThunk("/api/shop/order/orderdetails/userId/orderId" , async({userId ,orderId}, {rejectWithValue}) => {

    try {
        
        const response = await axios.get(`http://localhost:5000/api/shop/order/orderdetails/${userId}/${orderId}`  , {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
});

const ShopOrderSlice = createSlice({
    name:"ShopOrders",
    initialState:initialObj,
    reducers:{

        reset_order_details: (state) => {

            state.orderDetails = null
        }
    },
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
        }).addCase(ShopOrdersList.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopOrdersList.fulfilled , (state,action) => {

            state.isLoading=false,
            state.ordersList=action.payload.success ? action.payload.data :[]

        }).addCase(ShopOrdersList.rejected , (state,action) => {

            state.isLoading=false,
            state.ordersList=[]

        }).addCase(ShopOrderDetails.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopOrderDetails.fulfilled , (state,action) => {

            state.isLoading=false,
            state.orderDetails=action.payload.success ? action.payload.data :[]

        }).addCase(ShopOrderDetails.rejected , (state,action) => {

            state.isLoading=false,
            state.orderDetails=[]

        })

    }
});

export const {reset_order_details} = ShopOrderSlice.actions;

export default ShopOrderSlice.reducer;