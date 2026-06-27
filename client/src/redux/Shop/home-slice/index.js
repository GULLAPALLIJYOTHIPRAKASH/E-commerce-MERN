import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initalObj = {
    isLoading:false,
    bannersList:[],
    productsList:[]
}


// Get all Banners 
export const ShopGetAllBanners = createAsyncThunk("/api/shop/home/allbanners" , async(_, {rejectWithValue}) => {

    try {

        const response  = await axios.get("http://localhost:5000/api/shop/home/allbanners" , {withCredentials:true});

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
        })
    }
});


export default ShopHomeSlice.reducer;