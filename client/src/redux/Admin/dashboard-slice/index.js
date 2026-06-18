import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialObj = {
    isLoading:false,
    bannersList:[]
}

// add banner
export const AdminAddBanner = createAsyncThunk("/api/admin/dashbaord/addbanner" , async (formData , {rejectWithValue}) => {

    try {

        const response = await axios.post('http://localhost:5000/api/admin/dashboard/add-banner' , formData , {
            withCredentials:true
        })

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error?.response.data))
    }
});

// get All Banner 
export const AdminGetAllBanners = createAsyncThunk("/api/admin/dashbaord/allbanners" , async (_ , {rejectWithValue}) => {

    try {

        const response = await axios.get('http://localhost:5000/api/admin/dashboard/allbanners'  , {
            withCredentials:true
        })

        return response.data
        
    } catch (error) {
        
        return(rejectWithValue(error?.response.data))
    }
}) 


// delete Banner 
export const AdminDeleteBanners = createAsyncThunk("/api/admin/dashbaord/delete/bannerId" , async (bannerId, {rejectWithValue}) => {

    try {

        const response = await axios.delete(`http://localhost:5000/api/admin/dashboard/delete/${bannerId}` , {
            withCredentials:true
        })

        return response.data
        
    } catch (error) {
        
        return(rejectWithValue(error?.response.data))
    }
}) 

const AdminDashboardSlice = createSlice({
    name:"AdminDashboard",
    initialState:initialObj,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(AdminAddBanner.pending , (state) => {

            state.isLoading= true
        }).addCase(AdminAddBanner.fulfilled , (state) => {

            state.isLoading= false,
            state.bannersList=[]
        }).addCase(AdminAddBanner.rejected , (state) => {

            state.isLoading= false,
            state.bannersList=[]
        }).addCase(AdminGetAllBanners.pending , (state) => {

            state.isLoading= true
        }).addCase(AdminGetAllBanners.fulfilled , (state,action) => {

            state.isLoading= false,
            state.bannersList=action.payload.success ? action.payload.data : []
        }).addCase(AdminGetAllBanners.rejected , (state,action) => {

            state.isLoading= false,
            state.bannersList=[]
        }).addCase(AdminDeleteBanners.pending , (state)=> {

            state.isLoading=true
        }).addCase(AdminDeleteBanners.fulfilled , (state)=> {

            state.isLoading=false
        }).addCase(AdminDeleteBanners.rejected , (state)=> {

            state.isLoading=false
        })
    }
});

export default AdminDashboardSlice.reducer;