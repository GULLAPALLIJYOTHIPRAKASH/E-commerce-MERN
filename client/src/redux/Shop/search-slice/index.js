import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialObj= {

    isLoading: false,
    searchProducts:[]
}

const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL

export const ShopSearch = createAsyncThunk("/api/shop/search/keyword" , async(keyword,{rejectWithValue}) => {

    try {

        const response  = await axios.get(`${BackendAPI_URL}/api/shop/search/${keyword}` , {withCredentials:true});

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})

const ShopSearchSlice = createSlice({
    name:"ShopSearch",
    initialState:initialObj,
   reducers: {
        resetSearch: (state) => {

            state.searchProducts = []
        }
    },
    extraReducers: (builder) => {

        builder.addCase(ShopSearch.pending , (state) => {

            state.isLoading=true
        }).addCase(ShopSearch.fulfilled , (state,action) => {

            state.isLoading=false,
            state.searchProducts=action.payload.success ? action.payload.data : []
        }).addCase(ShopSearch.rejected , (state,action) => {

            state.isLoading=false,
            state.searchProducts= []
        })

        

    }
});

export const {resetSearch} = ShopSearchSlice.actions;
export default ShopSearchSlice.reducer;