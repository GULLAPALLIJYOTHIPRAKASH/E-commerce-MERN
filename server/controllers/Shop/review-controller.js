const ReviewModel = require("../../models/Review");
const OrderModel = require("../../models/Order");


// Add reviews
const AddReview = async (request , response) => {

    try {


        const {userId ,username, productId , reviewMessage ,reviewValue} = request.body;

        if(!userId || !username || !productId  || !reviewMessage  || !reviewValue){

            return(

                response.status(400).json({
                    success:false,
                    message:"Invalid data"
                })
            )
        }


        // check order availablity
        const checkOrder = await OrderModel.findOne({
            userId:userId,
            "cartItems.productId":productId,
            orderStatus:"delivered"
        })


        if(!checkOrder){

            return(
                 response.status(404).json({
                    success:false,
                    message:"please buy product before  add review."
                })
            )
        }


        // 2nd check review give or not
        const checkReview = await ReviewModel.find({
            userId,
            productId
        })


        if(checkReview){

             return(
                 response.status(200).json({
                    success:false,
                    message:"Already product reviews"
                })
            )
        }


        // add review
        const addReview = new ReviewModel({
            userId ,username, productId , reviewMessage ,reviewValue

        })


        // save review
        await addReview.save();


        // get all review on product
        const reviews = await ReviewModel.find({productId});
        console.log("total reviews:" ,reviews);
        
        const totalReviews = reviews.length; 

        const avgReviews = reviews.reduce((acc , item) => {

            return ( acc += item.reviewValue)

        },0) /  totalReviews
       


        // then save
        await ReviewModel.findByIdAndUpdate(productId , avgReviews , {new:true} );
        

        console.log(reviews);
        

        return(

            response.status(201).json({

                success:true,
                message:"product review added successfully",

            })
        )
    } catch (error) {
        
        return(
            response.status(500).json({
                success:false,
                message: error.message || "add product review failed"
            })
        )
    }
}


// get reviews
const GetAllReviews = async (request , response) => {

    try {

        const {productId} = request.params ;

        if(!productId){


             return(

                response.status(400).json({
                    success:false,
                    message:"Invalid data"
                })
            )

        }


        // get all review 
        const reviewList = await ReviewModel.find({
            productId
        });


        if(reviewList.length > 0){


            return(

                response.status(200).json({
                    success:true,
                    message:"review list",
                    data:reviewList
                })
            )
        }



       
        

        return(

            response.status(404).json({

                success:false,
                message:"No product reviews",

            })
        )
    } catch (error) {
        
        return(
            response.status(500).json({
                success:false,
                message: error.message || "get all product review failed"
            })
        )
    }
}


module.exports = {AddReview , GetAllReviews};