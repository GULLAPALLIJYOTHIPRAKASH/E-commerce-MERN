import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialObj = {

    isLoading:false,
    user_accounts:[]
}

const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL




// fetch all addresss
export const AdminGetAllUsers = createAsyncThunk('/api/admin/account/allusers' , async ( _, {rejectWithValue}) => {

    try {
        
        const response = await axios.get(`${BackendAPI_URL}/api/admin/account/allusers` , {withCredentials:true});

        return response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


// edit address
export const AdminUpdateAccount  = createAsyncThunk('/api/admin/account/update-account/userId' , async ({userId,username , email , role }, {rejectWithValue}) => {

    try {
        
        const response = await axios.put(`${BackendAPI_URL}/api/admin/account/update-account/${userId}`, {username , email , role :  role ? "seller" : "user"}, {withCredentials:true});

        return response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


// delete address
export const AdminDeleteAccount = createAsyncThunk('/api/admin/account/delete-account/userId' , async (userId, {rejectWithValue}) => {

    try {
        
        const response = await axios.delete(`${BackendAPI_URL}/api/admin/account/delete-account/${userId}`, {withCredentials:true});

        return response.data
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})


const AdminAccountSlice = createSlice({
    name:"Admin account",
    initialState:initialObj,
    reducers:{},
    extraReducers:(builder) => {

        builder.addCase(AdminGetAllUsers.pending , (state) => {

            state.isLoading =true
        }).addCase(AdminGetAllUsers.fulfilled , (state,action) => {

            state.isLoading =false
            state.user_accounts=action.payload.success ? action.payload.data : []
        }).addCase(AdminGetAllUsers.rejected , (state,action) => {

            state.isLoading =false
            state.user_accounts= []

        }).addCase(AdminUpdateAccount.pending , (state) => {

            state.isLoading =true
        }).addCase(AdminUpdateAccount.fulfilled , (state,action) => {

            state.isLoading =false
        }).addCase(AdminUpdateAccount.rejected , (state,action) => {

            state.isLoading =false

        }).addCase(AdminDeleteAccount.pending , (state) => {

            state.isLoading =true
        }).addCase(AdminDeleteAccount.fulfilled , (state,action) => {

            state.isLoading =false
        }).addCase(AdminDeleteAccount.rejected , (state,action) => {

            state.isLoading =false

        })

    }
});

export default AdminAccountSlice.reducer;
