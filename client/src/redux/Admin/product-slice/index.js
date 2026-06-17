import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialObj = {
    isLoading:false,
    productsList :[]
}

// Add products
export const AddAdminProduct = createAsyncThunk('/api/admin/product/add' , async(formData , {rejectWithValue}) => {

    try {
        
        const response  = await axios.post('http://localhost:5000/api/admin/product/add' , formData , {
            withCredentials:true ,
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.data
    } catch (error) {

        return(rejectWithValue(error?.response.data))
        
    }
});

// Update products
export const UpdateAdminProduct = createAsyncThunk('/api/admin/product/update/productId' , async({productId , formData} , {rejectWithValue}) => {

    try {

        const response = await axios.put(`http://localhost:5000/api/admin/product/update/${productId}` , formData , {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

        return response.data;
    } catch (error) {
        
        return(error?.response.data)
    }
});


//delete products
export const DeleteAdminProduct = createAsyncThunk('/api/admin/product/delete/productId' , async(productId , {rejectWithValue}) => {

    try {

        const response = await axios.delete(`http://localhost:5000/api/admin/product/delete/${productId}`  , {
            withCredentials:true,
           
        });

        return response.data;
    } catch (error) {
        
        return(error?.response.data)
    }
});

// get All products 
export const GetAllAdminProducts = createAsyncThunk('/api/admin/product/allproducts' , async(_ , {rejectWithValue}) => {

    try {

        const response = await axios.get(`http://localhost:5000/api/admin/product/allproducts` , {
            withCredentials:true,
        });

        return response.data;
    } catch (error) {
        
        return(error?.response.data)
    }
})

const AdminProductSlice = createSlice({

    name:"AdminProduct",
    initialState:initialObj,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(GetAllAdminProducts.pending , (state) => {

            state.isLoading=true
        }).addCase(GetAllAdminProducts.fulfilled , (state, action) => {
            

            state.isLoading=false
            state.productsList= action.payload.success ?  action.payload.data : []
        }).addCase(GetAllAdminProducts.rejected , (state, action) => {
            

            state.isLoading=false
            state.productsList=[]
        })

    }

});

export default AdminProductSlice.reducer;