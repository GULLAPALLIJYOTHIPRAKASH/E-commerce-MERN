import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initalObj = {
    isLoading:false,
    bannersList:[],
    productsList:[]
}

const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL

// Get all Banners 
export const ShopGetAllBanners = createAsyncThunk("/api/shop/home/allbanners" , async(_, {rejectWithValue}) => {

    try {

        const response  = await axios.get(`${BackendAPI_URL}/api/shop/home/allbanners` , {withCredentials:true});

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})

// Get all Products 
export const ShopGetAllProducts = createAsyncThunk("/api/shop/home/products" , async(_, {rejectWithValue}) => {

    try {

        const response  = await axios.get(`${BackendAPI_URL}/api/shop/home/products` , {withCredentials:true});

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


const ShopHomeSlice = createSlice({
    name:"ShopHome",
    initialState:initalObj,
    reducers:{},
    extraReducers:(builder) => {

        builder.addCase(ShopGetAllBanners.pending , (state) => {

            state.isLoading = true
        }).addCase(ShopGetAllBanners.fulfilled , (state, action) => {

            state.isLoading = false,
            state.bannersList= action.payload.success ? action.payload.data : []
        }).addCase(ShopGetAllBanners.rejected , (state, action) => {

            state.isLoading = false,
            state.bannersList=  []
        }).addCase(ShopGetAllProducts.pending , (state) => {

            state.isLoading = true
        }).addCase(ShopGetAllProducts.fulfilled , (state, action) => {

            state.isLoading = false,
            state.productsList= action.payload.success ? action.payload.data : []
        }).addCase(ShopGetAllProducts.rejected , (state, action) => {

            state.isLoading = false,
            state.productsList=  []
        })
    }
});


export default ShopHomeSlice.reducer;