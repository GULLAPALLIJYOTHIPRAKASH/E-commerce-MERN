require("dotenv").config();
const express = require("express");
const app = express();
const ConnectToDB = require("./database/db");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const AuthRouter = require("./routes/Auth/auth-route");
const AdminProductsRouter = require("./routes/Admin/Product/product-route");
const AdminDashboardRouter = require("./routes/Admin/Dashboard/dashboard-route");

// PORT
const PORT = process.env.PORT || 5000;

//  DB Connection
ConnectToDB();


// cors 
// allow to front-end communicate to server
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods:["GET" ,"POST" , "PUT" , "DELETE"],
        allowedHeaders: [
            "Authorization",
            "Content-Type",
            "Cache-Control", // to control cach and 
            "Expires",
            "Pragma"
        ],
        credentials:true  // need to  authenticate every api 

    }
))



// read/write cookie from server
app.use(cookieparser());

// json parse body on req/res
app.use(express.json());


// All routes

// Auth route
app.use("/api/auth" , AuthRouter);

// Admin Products route
app.use("/api/admin/product" , AdminProductsRouter);

// Admin Dashboard route
app.use('/api/admin/dashboard' , AdminDashboardRouter)









// listen port
app.listen(PORT , () => {

    console.log(`Server is running on  http://localhost:${PORT}/ port`);
    
})