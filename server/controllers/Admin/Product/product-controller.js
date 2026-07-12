
const UploadToCloudinary = require("../../../helper/cloudinary");
const fs = require("fs");
const ProductModel = require("../../../models/Product");
const cloudinary = require("../../../config/cloudinary");



// Upload Img 
 const UploadImg = async (request , response)  => {

    let file ;

    try {
        
        // get image file 
        file = request.file;

       if(!file){

        return(
            response.status(400).json({
                success:false,
                message:"Image file is missing"
            })
        )
       }

        // upload to cloudinary    
      let data =  await UploadToCloudinary(file.path);


      if(data){

        return(
            response.status(201).json({
                success:true,
                message:"Successfuly Img uplaoded to cloudinary",
                data:{
                    publicId:data?.public_id,
                    url:data?.secure_url,
                    size:data?.bytes
                }
            })
        )
      }
      else{
        
        return(
            response.status(400).json({

                success:false,
                message:"failed to upload to cloudinary, please try after sometime."
            })
        )
      }
        
    } catch (error) {
        
        console.log(error);

        return(response.status(500).json({
            success:false,
            message:  error.message || "Upload to cloudinary failed"
        }))
        
    }
    finally{

        // remove file from local server memory
      if(file?.path){

        try {
            
        // remove img from local server 
        await fs.promises.unlink(file.path);
        } catch (error) {

            console.log("Deleting Img from server Error:" , error);
            
            
        }
      }
    }
}


// Add Product 
const AddProduct  =  async (request , response)  => {

    try{

        const {image , title , description , category , brand , price , salePrice , totalStock } = request.body;

        if(!image || !title || !description || !category || !brand || !price  || !totalStock){

            return(
                response.status(400).json({
                    success:false,
                    message:"please provide required fields image , title , description , category , brand , price  , totalStock , userId"
                })
            )
        }


        // add to DB
        const newProducts = new  ProductModel({

            image , title , description , category , brand , price , salePrice , totalStock ,
            createdBy:request.user?.id 


        });

        await newProducts.save();


        if(newProducts){

            return(

                response.status(201).json({
                    success:true,
                    message:"Product Added Successfuly"
                })
            )
        }else{

            return(

                response.status(400).json({
                    success:true,
                    message:"Failed to Added Product."
                })
            )


        }
        
    } catch (error) {
        
        console.log(error);

        return(response.status(500).json({
            success:false,
            message:  error.message || "AddProduct failed"
        }))
        
    }
    
}



// update product 
const UpdateProduct = async (request , response ) => {

    try {

        const productId = request.params.productId;
        const formData = request.body;
        const {id} = request.user;

        if(!formData){

            return(

                response.status(400).json({
                    success:false,
                    message:"Missing data."
                })
            )
        }



        // check product it is available to update
        const checkproduct  = await ProductModel.findById(productId);

        if(!checkproduct){

            return(

                response.status(404).json({
                    success:false,
                    message:"product is not available."
                })
            )
        }

        //  update product only if admin created
        if(checkproduct.createdBy.toString() !== id){

            return(
                response.status(401).json({
                    success:false,
                    message:"UnAuthorize admin,please update only that you created"
                })
            )
        }

        const productData = {

            image : {

                url:  checkproduct.image.url,
                publicId: checkproduct.image.publicId
            },
            title:  formData?.title  || checkproduct.title ,
            description: formData?.description ||  checkproduct.description,
            category: formData?.category ||  checkproduct.category,
            brand: formData?.brand ||  checkproduct.brand,
            price:  formData?.price ||  formData?.price ,
            salePrice:  formData?.salePrice ??  formData?.salePrice ,
            totalStock:  formData?.totalStock ??  formData?.totalStock ,
            createdBy: checkproduct.createdBy
            
        }


        const updatedData = await ProductModel.findByIdAndUpdate(productId , productData , {new:true});


        return(

            response.status(200).json({
                    success:true,
                    message:"product is update Successfuly."
                })
        )
        
    } catch (error) {
        
        console.log(error);

        return(

            response.status(500).json({
                success:false,
                message: error.message || "Failed to update product"
            })
        )
        
    }
}


// delete product
const DeleteProduct = async (request , response ) => {

    try {

        const productId = request.params.productId;
        const {id} = request?.user;
                

        // check product it is available to delete
        const checkproduct  = await ProductModel.findById(productId);

        if(!checkproduct){

            return(

                response.status(404).json({
                    success:false,
                    message:"product is not available."
                })
            )
        }

        //  delete product only if admin created
        if(checkproduct.createdBy.toString() !== id){

        return(
            response.status(401).json({
                success:false,
                message:"UnAuthorize admin,please update only that you created"
            })
        )
        }


        // Delete in cloudinary
        await cloudinary.uploader.destroy(checkproduct?.image.publicId);

        // delete in DB
        const del_product = await ProductModel.findByIdAndDelete(checkproduct?._id);


        if(del_product){

            return(
                
                response.status(200).json({
                    success:true,
                    message:"product is delete Successfuly."
                })
            )
        }else{

             return(
                
                response.status(400).json({
                    success:false,
                    message:"Failed to delete the product.Please try again"
                })
            )

        }
        
    } catch (error) {
        
        console.log(error);

        return(

            response.status(500).json({
                success:false,
                message: error.message || "Failed to delete product"
            })
        )
        
    }
}


// get All products
const GetAllProducts = async (request , response ) => {

    try {

        const getproductsList =  await ProductModel.find({});

        if(getproductsList.length > 0){

            return(
                response.status(200).json({
                    success:true,
                    message:"Get All products available",
                    data:getproductsList
                })
            )
        }else{

             return(
                response.status(404).json({
                    success:false,
                    message:"No products available",
                })
            )


        }
        
    } catch (error) {
        
        return(
            response.status(500).json({
                success:false,
                message: error.message || "Get All products Failed"
            })
        )
    }
}

module.exports = {UploadImg , AddProduct , UpdateProduct , DeleteProduct , GetAllProducts};