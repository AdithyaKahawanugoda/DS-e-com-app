const express = require("express");
const router = express.Router();

//import middleware
const {protectedSellerRoutes} = require("../middlewares/seller-auth");


//import controllers
const { getSellerProducts,createSellerProduct,updateSellerproduct,deleteSellerProducts,getSellerDetails,updateSellerDetails,deleteSellerDetails } = require("../controllers/profile-seller-controller");

//routes
router.route("/product/add").post(protectedSellerRoutes,createSellerProduct);
router.route("/product/getall/:sellerID").get(protectedSellerRoutes,getSellerProducts);
router.route("/product/update/:id").put(protectedSellerRoutes,updateSellerproduct);
router.route("/product/delete/:id").delete(protectedSellerRoutes,deleteSellerProducts);
router.route("/seller/:sellerID").get(protectedSellerRoutes,getSellerDetails);
router.route("/seller/update/:id").put(protectedSellerRoutes,updateSellerDetails);
router.route("/seller/delete/:id").delete(protectedSellerRoutes,deleteSellerDetails);


module.exports = router;