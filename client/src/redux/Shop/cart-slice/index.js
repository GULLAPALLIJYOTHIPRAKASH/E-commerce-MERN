import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import  axios from "axios"

const initialObj={

    isLoading:false,
    cartItems:{}
}

export const ShopAddToCart = createAsyncThunk('/api/shop/cart/add' , async({userId, productId , quantity}, {rejectWithValue}) => {

    try {
        
        const response = await axios.post("http://localhost:5000/api/shop/cart/add" ,{userId, productId , quantity} ,
            {
                withCredentials:true,
               
            }
         );

      return  response?.data;

    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
});


export const ShopGetAllCartItems = createAsyncThunk('/api/shop/cart/getcart' , async(userId, {rejectWithValue}) => {

    try {
        
        const response = await axios.get(`http://localhost:5000/api/shop/cart/getcart/${userId}`,
            {
                withCredentials:true,
                
            }
         );

      return  response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
});


export const ShopUpdateCart = createAsyncThunk('/api/shop/cart/update-cart' , async({userId, productId , quantity}, {rejectWithValue}) => {

    try {
        
        const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart" ,{userId, productId , quantity} ,
            {
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            }
         );

      return  response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
});

export const ShopDeleteCart = createAsyncThunk('/api/shop/cart/delete-cart/userId/productId' , async({userId, productId}, {rejectWithValue}) => {

    try {

        console.log({userId, productId});
        
        const response = await axios.delete(`http://localhost:5000/api/shop/cart/delete-cart/${userId}/${productId}`,{withCredentials:true,});

      return  response.data;

    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
});



const ShopCartSlice = createSlice({

    name:"ShopCartItems",
    initialState:initialObj,
    reducers:{},
    extraReducers:(builder) => {

        builder.addCase(ShopAddToCart.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopAddToCart.fulfilled , (state) => {


            state.isLoading=false
            state.cartItems={}
        }).addCase(ShopAddToCart.rejected , (state) => {

            state.isLoading=false
            state.cartItems={}
        }).addCase(ShopGetAllCartItems.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopGetAllCartItems.fulfilled , (state,action) => {

            state.isLoading=false
            state.cartItems=action.payload.success ? action.payload.data : {}
        }).addCase(ShopGetAllCartItems.rejected , (state) => {

            state.isLoading=false
            state.cartItems={}
        }).addCase(ShopUpdateCart.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopUpdateCart.fulfilled , (state,action) => {

            state.isLoading=false
            state.cartItems=action.payload.success ? action.payload.data : {}
        }).addCase(ShopUpdateCart.rejected , (state) => {

            state.isLoading=false
            state.cartItems={}
        }).addCase(ShopDeleteCart.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopDeleteCart.fulfilled , (state,action) => {

            state.isLoading=false
            state.cartItems=action.payload.success ? action.payload.data : {}
        }).addCase(ShopDeleteCart.rejected , (state) => {

            state.isLoading=false
            state.cartItems={}
        })

    }
    
});

export default ShopCartSlice.reducer;

