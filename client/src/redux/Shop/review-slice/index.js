import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialObj= {

    isLoading: false,
    reviewsList:[]
}

export const ShopAddReview = createAsyncThunk("/api/shop/review/add-review" , async(formData,{rejectWithValue}) => {

    try {

        const response  = await axios.post(`http://localhost:5000/api/shop/review/add-review` , formData, {withCredentials:true});

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


export const ShopGetAllReviews = createAsyncThunk("/api/shop/review/allreviews" , async(productId,{rejectWithValue}) => {

    try {

        const response  = await axios.get(`http://localhost:5000/api/shop/review/allreviews/${productId}` , {withCredentials:true});

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


const ShopReviewsSlice = createSlice({
    name:"Shop reviews",
    initialState:initialObj,
    reducers: {
        reset_reviews:(state) => {

            state.reviewsList = []
        }
},
extraReducers : (builder) => {

    builder.addCase(ShopAddReview.pending , (state) => {
    
                state.isLoading=true
            }).addCase(ShopAddReview.fulfilled , (state,action) => {
    
                state.isLoading=false
            }).addCase(ShopAddReview.rejected , (state,action) => {
    
                state.isLoading=false
            }).addCase(ShopGetAllReviews.pending , (state) => {
    
                state.isLoading=true
            }).addCase(ShopGetAllReviews.fulfilled , (state,action) => {
    
                state.isLoading=false,
                state.reviewsList=action.payload.success ? action.payload.data : []
            }).addCase(ShopGetAllReviews.rejected , (state,action) => {
    
                state.isLoading=false,
                 state.reviewsList=[]
            })
    


}
});


export const {reset_reviews} = ShopReviewsSlice.actions;

export default ShopReviewsSlice.reducer;

