import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialObj= {

    isLoading:true,
    isAuthenticated:false,
    user:null
}

// register user 
export const RegisterUser  = createAsyncThunk('/auth/register' ,  async (formData, {rejectWithValue}) => {

    try {

        const response = await axios.post("http://localhost:5000/api/auth/register" , formData , {
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
export const LoginUser = createAsyncThunk('/auth/login' , async(formData , {rejectWithValue}) => {

    try {

        const response = await axios.post("http://localhost:5000/api/auth/login" , formData , {
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
export const LogoutUser = createAsyncThunk('/auth/logout' , async(_ , {rejectWithValue}) => {

    try {

        const response = await axios.post("http://localhost:5000/api/auth/logout", {} , {
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
export const CheckAuthUser = createAsyncThunk('/auth/checkuser' , async(_, {rejectWithValue}) => {

    try {
        
        const response = await axios.get("http://localhost:5000/api/auth/checkuser",{
            withCredentials:true,
            "Cache-Control": "no-store no-cache must-revalidate proxy-revalidate"
        })

        return response.data;
    } catch (error) {

        return(rejectWithValue(error?.response?.data))
        
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

            state.isLoading=false
            state.isAuthenticated= action.payload.success ? true : false
            state.user = action.payload.success ? action.payload.data  : null
        }).addCase(LoginUser.rejected , (state)=> {

            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        }).addCase(CheckAuthUser.pending , (state)=> {

            state.isLoading=true
        }).addCase(CheckAuthUser.fulfilled , (state , action) => {

            state.isLoading=false
            state.isAuthenticated= action.payload.success ? true : false
            state.user = action.payload.success ? action.payload.data  : null
        }).addCase(CheckAuthUser.rejected , (state , action) => {

            state.isLoading=false
            state.isAuthenticated=  false
            state.user = null
        }).addCase(LogoutUser.fulfilled , (state , action) => {

            state.isLoading=false
            state.isAuthenticated=  false
            state.user = null

        })

    }
})

export default AuthSlice.reducer;