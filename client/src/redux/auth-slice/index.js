import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialObj= {

    isLoading:false,
    isCheckingAuth:true,
    isAuthenticated:false,
    user:null
}

const BackendAPI_URL = import.meta.env.VITE_BACKEND_API_URL



// register user 
export const RegisterUser  = createAsyncThunk('api/auth/register' ,  async (formData, {rejectWithValue}) => {

    try {

        const response = await axios.post(`${BackendAPI_URL}/api/auth/register` , formData , {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
            
        })

        return response.data;
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
});


// login 
export const LoginUser = createAsyncThunk('api/auth/login' , async(formData , {rejectWithValue}) => {

    try {

        const response = await axios.post(`${BackendAPI_URL}/api/auth/login` , formData , {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })

        return response.data
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})




// logout
export const LogoutUser = createAsyncThunk('api/auth/logout' , async(_ , {rejectWithValue}) => {

    try {

        const response = await axios.post(`${BackendAPI_URL}/api/auth/logout`, {} , {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })

        return response.data
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})



// check auth user
export const CheckAuthUser = createAsyncThunk('api/auth/checkuser' , async(_, {rejectWithValue}) => {

    try {
        
        const response = await axios.get(`${BackendAPI_URL}/api/auth/checkuser`,{
            withCredentials:true,
            headers :{

            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"

            }
        })

        return response.data;
    } catch (error) {

        return(rejectWithValue(error?.response?.data))
        
    }
})

// verify Email account
export const VerifyEmailAccount = createAsyncThunk('api/auth/verify_email' , async(formData, {rejectWithValue}) => {

    try {

        const response = await axios.post(`${BackendAPI_URL}/api/auth/verify_email`, formData , {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })

        return response.data
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})

// resend otp 
export const ReSendOTP =createAsyncThunk('api/auth/resend_otp' , async(email, {rejectWithValue}) => {

    try {

        const response = await axios.post(`${BackendAPI_URL}/api/auth/resend_otp`,{ email} , {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })

        return response.data
        
    } catch (error) {
        
        return(rejectWithValue(error.response.data))
    }
})

const AuthSlice = createSlice({
    name:"auth",
    initialState:initialObj,
    reducers:{},
    extraReducers : (builder) => {

        builder.addCase(RegisterUser.pending , (state)=> {

            state.isLoading=true
        }).addCase(RegisterUser.fulfilled , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        }).addCase(RegisterUser.rejected , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        }).addCase(LoginUser.pending , (state)=> {

            state.isLoading=true
        }).addCase(LoginUser.fulfilled , (state, action)=> {

            state.isLoading=false  // email verify added
            state.isAuthenticated= action.payload.data.verify_email ? true : false 
            state.user = action.payload.success ? action.payload.data  : null
        }).addCase(LoginUser.rejected , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        }).addCase(CheckAuthUser.pending , (state)=> {

            state.isCheckingAuth=true
        }).addCase(CheckAuthUser.fulfilled , (state , action) => {

            state.isCheckingAuth=false // email verify added
            state.isAuthenticated= action.payload.data.verify_email ? true : false 
            state.user = action.payload.success ? action.payload.data  : null
        }).addCase(CheckAuthUser.rejected , (state , action) => {

            state.isCheckingAuth=false
            state.isAuthenticated=  false
            state.user = null
        }).addCase(LogoutUser.fulfilled , (state , action) => {

            state.isLoading=false
            state.isAuthenticated=  false
            state.user = null

        }).addCase(VerifyEmailAccount.pending , (state)=> {

            state.isLoading=true
        }).addCase(VerifyEmailAccount.fulfilled , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        }).addCase(VerifyEmailAccount.rejected , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        }).addCase(ReSendOTP.pending , (state)=> {

            state.isLoading=true
        })
        .addCase(ReSendOTP.fulfilled , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        }).addCase(ReSendOTP.rejected , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })

    }
})

export default AuthSlice.reducer;