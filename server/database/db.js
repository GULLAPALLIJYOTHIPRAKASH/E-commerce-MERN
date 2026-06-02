const mongoose = require("mongoose");



const ConnectToDB = async () => {

    try {
        
        // connection
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB Connected Successfuly");
        
    } catch (error) {

        console.log("MongoDB Error:" ,error);
        process.exit(1);
        
        
    }
}

module.exports = ConnectToDB;