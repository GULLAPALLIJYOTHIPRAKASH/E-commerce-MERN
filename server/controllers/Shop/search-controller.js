const ProductModel = require("../../models/Product");

// search products
const SearchProducts = async (request , response) => {

    try {

        const {keyword} = request.params;


        

        if(!keyword || typeof keyword != "string" ){

            return(
                response.status(400).json({
                    success:false,
                    message:"keyword is invalid"
                })
            )
        }

        // check lowercase
        const reqEx = new RegExp(keyword , "i");

        const searchpattern = {

            $or : [

                { title: reqEx },
                { description: reqEx },
                { category: reqEx },
                { brand: reqEx },

            ]
        }


        const checkproducts = await ProductModel.find(searchpattern);


        if(checkproducts.length  === 0){

            return(
                response.status(404).json({
                    success:false,
                    message:"No Product Found"
                })
            )
        }
        

        return(

            response.status(200).json({

                success:true,
                message:"search product found",
                data:checkproducts
            })
        )
    } catch (error) {
        
        return(
            response.status(500).json({
                success:false,
                message: error.message || "Search products failed"
            })
        )
    }
}

module.exports = {SearchProducts}