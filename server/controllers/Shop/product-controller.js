const ProductModel = require("../../models/Product");


// All product with sort
const AllProducts = async (request , response) =>{

    try {

        const productsList = await ProductModel.find({});
        
        if(productsList.length > 0){

            return(
                response.status(200).json({

                    success:true,
                    message:"Available product List",
                    data:productsList
                })
            )
        }else{


            return(
                response.status(400).json({
                    success:false,
                    message:"No products Available"
                })
            )
        }
        
    } catch (error) {
        
        return(
            response.status(400).json({

                success:false,
                message: error.message || "Shop All product failed."
            })
        )
        
    }
}


const GetSingleProducts =  async(request , response) => {

    try {

        const productId = request.params.productId;

        const product = await ProductModel.findById(productId);

        if(product){

            return(

                response.status(200).json({

                    success:true,
                    message:"Product found",
                    data:product
                })
            )

        }else{

            response.status(404).json({
                success:false,
                message:"No product found"
            })
        }
        
    } catch (error) {
        
    }
}

module.exports = {AllProducts , GetSingleProducts}