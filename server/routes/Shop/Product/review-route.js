const express = require("express");
const router = express.Router();
const { Check_User } = require("../../../middleware/Auth/auth-middleware");
const { AddReview, GetAllReviews } = require("../../../controllers/Shop/review-controller");



// All routes related to products reviews

router.post("/add-review" , Check_User , AddReview);
router.get("/allreviews/:productId" ,Check_User , GetAllReviews);

module.exports = router;