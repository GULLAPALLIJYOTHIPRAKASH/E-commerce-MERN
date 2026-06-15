const express = require("express");
const router = express.Router();
const {Check_User , CheckAdmin_User} = require("../../middleware/Auth/auth-middleware");
const multerMiddleware = require("../../middleware/Auth/Admin/multer-middleware");
const { UploadImg, AddProduct, UpdateProduct, DeleteProduct, GetAllProducts } = require("../../controllers/Admin/product-controller");

// All routes related to Admin Products
router.post("/uploadImg" , Check_User , CheckAdmin_User ,multerMiddleware.single('image') ,UploadImg);

router.post("/add" , Check_User , CheckAdmin_User ,AddProduct);
router.put("/update/:productId" , Check_User , CheckAdmin_User ,UpdateProduct);
router.delete("/delete/:productId" , Check_User , CheckAdmin_User ,DeleteProduct);

router.get("/allproducts" , Check_User, CheckAdmin_User , GetAllProducts);

module.exports = router;