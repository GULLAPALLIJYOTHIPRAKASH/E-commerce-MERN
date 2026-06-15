const multer= require("multer");
const path = require("path");


const Storage = multer.diskStorage({

    // uplaoded img file path
    destination: (req , file , cb) => {

        
        cb( null,'upload/');
    },
    // file name
    filename: (req ,file , cb )=> {
    console.log("upload file obj: " , file);
        
        cb(null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const Check_FileFilter = (req , file , cb) => {

    if(file.mimetype.startsWith("image")){

        cb(null , true);
    }else{

        // throw error
        cb(new Error("please upload only images") , false);
    }
}

module.exports = multer({
    storage:Storage,
    fileFilter:Check_FileFilter,
    limits:{

        fileSize: 5 * 1024 * 1024 //5MB
    }
})