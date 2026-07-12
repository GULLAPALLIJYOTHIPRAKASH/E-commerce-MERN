import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialObj = {

    isLoading:false,
    productsList:[],
}

const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL

export const ShopAllProducts = createAsyncThunk('/api/shop/products/allproducts' , async({filterparams , sortBy} , {rejectWithValue}) => {

    try {

        const query = new URLSearchParams({
            ...filterparams , sortBy:sortBy
        })

        const response = await axios.get(`${BackendAPI_URL}/api/shop/products/allproducts?${query}` , {withCredentials:true});

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error?.response.data))
    }
});

export const ShopSingleProduct = createAsyncThunk('/api/shop/products/productId' , async(productId , {rejectWithValue}) => {

    try {

        const response = await axios.get(`${BackendAPI_URL}/api/shop/products/${productId}`, {withCredentials:true});

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error?.response.data))
    }
});


const ShopProductSlice = createSlice({
    name:"ShopProductList",
    initialState:initialObj,
    reducers:{},
    extraReducers:(builder) => {

        builder.addCase(ShopAllProducts.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopAllProducts.fulfilled , (state,action) => {

            // console.log(action.payload);
            

            state.isLoading=false,
            state.productsList=action.payload.success ? action.payload.data : [];
        }).addCase(ShopAllProducts.rejected , (state,action) => {            

            state.isLoading=false,
            state.productsList=[]
        })
        
        
    }
});

export default ShopProductSlice.reducer;