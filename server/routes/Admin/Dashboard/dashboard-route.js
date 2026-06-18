const express = require("express");
const { Check_User, CheckAdmin_User } = require("../../../middleware/Auth/auth-middleware");
const { GetAllBanners, AddBanner, DeleteBanner, DeleteBannerCloudinary } = require("../../../controllers/Admin/Dashboard/dashboard-controller");
const multerMiddleware = require("../../../middleware/Auth/Admin/multer-middleware");
const router = express.Router();

// All routes related to dashboard

router.post("/add-banner" ,Check_User ,CheckAdmin_User,AddBanner);
router.get("/allbanners" ,Check_User ,CheckAdmin_User ,GetAllBanners );
router.delete("/delete/:bannerId" ,Check_User ,  CheckAdmin_User ,DeleteBanner);

// delete cloudinary
router.delete("/delete-cloudinary/:publicId" ,Check_User ,  CheckAdmin_User ,DeleteBannerCloudinary);

// future add put & delete

module.exports = router;