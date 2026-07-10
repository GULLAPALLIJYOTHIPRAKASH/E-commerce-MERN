import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from "axios"

const initialObj = {

    isLoading:false,
    ordersList:[],
    orderDetails:null
}

// order List
export const AdminOrdersList =  createAsyncThunk("/api/Admin/order/allorders" , async(_ , {rejectWithValue}) => {

    
    try {
        
        const response = await axios.get(`http://localhost:5000/api/Admin/order/allorders`  , {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
})

// order Details
export const AdminOrderDetails = createAsyncThunk("/api/Admin/order/orderdetails/orderId" , async(orderId, {rejectWithValue}) => {

    try {
        
        const response = await axios.get(`http://localhost:5000/api/Admin/order/orderdetails/${orderId}`  , {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
});


// update orderstatus
export const AdminUpdateOrderStatus  = createAsyncThunk("/api/Admin/order/update-orderstatus/orderId" , async({orderId, orderStatus}, {rejectWithValue}) => {

    try {
        
        const response = await axios.put(`http://localhost:5000/api/Admin/order/update-orderstatus/${orderId}`, {orderStatus}, {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        

        return(rejectWithValue(error.response.data))
    }
});


const AdminOrderSlice = createSlice({
    name:"AdminOrders",
    initialState:initialObj,
    reducers:{

        reset_order_details: (state) => {

            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {

        builder.addCase(AdminOrdersList.pending , (state) => {

            state.isLoading=true
        }).addCase(AdminOrdersList.fulfilled , (state,action) => {

            

            state.isLoading=false,
            state.ordersList= action.payload.success ? action.payload.data :[]

        }).addCase(AdminOrdersList.rejected , (state,action) => {

            state.isLoading=false,
            state.ordersList=[]

        }).addCase(AdminOrderDetails.pending , (state) => {

            state.isLoading=true
        }).addCase(AdminOrderDetails.fulfilled , (state,action) => {

            state.isLoading=false,
            state.orderDetails=action.payload.success ? action.payload.data :[]

        }).addCase(AdminOrderDetails.rejected , (state,action) => {

            state.isLoading=false,
            state.orderDetails=[]

        }).addCase(AdminUpdateOrderStatus.pending , (state) => {

            state.isLoading=true
        }).addCase(AdminUpdateOrderStatus.fulfilled , (state,action) => {

            state.isLoading=false,
            state.orderDetails=action.payload.success ? action.payload.data :[]

        }).addCase(AdminUpdateOrderStatus.rejected , (state,action) => {

            state.isLoading=false,
            state.orderDetails=[]

        })

    }
});

export const {reset_order_details} = AdminOrderSlice.actions;

export default AdminOrderSlice.reducer;