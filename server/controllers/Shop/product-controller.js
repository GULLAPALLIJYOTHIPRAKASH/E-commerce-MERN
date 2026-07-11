const ProductModel = require("../../models/Product");


// All product with filter ,sort
const AllProducts = async (request , response) =>{

    try {

        // get query data
        const {category=[] , brand=[] , sortBy="LH"} = request.query;
        
        
        
        
        
        const filter = {

        }

        if(category.length > 0){

            // check in category
            filter.category = {
            $in : [...category?.split(",")]
        }
        }

        if(brand.length > 0 ){

            // check in brand
            filter.brand = {
            $in : [...brand?.split(",")]
        }
        }


        const sort = {};
        // sort by
        switch(sortBy){

            case "LH":
               sort.price=1;
               break;
            case "HL":
                sort.price= -1;
                break;
            case "AZ":
                sort.title=1;
                break;
            case "ZA":
                sort.title=-1;
                break;
            default:
                sort.price=1;
            
        }

        const productsList = await ProductModel.find(filter).sort(sort);
        
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
                response.status(404).json({
                    success:false,
                    message:"No products Available"
                })
            )
        }
        
    } catch (error) {
        
        return(
            response.status(500).json({

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

          return(
            response.status(500).json({

                success:false,
                message: error.message || "Get Single product failed."
            })
        )
        
        
    }
}

module.exports = {AllProducts , GetSingleProducts}