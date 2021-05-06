const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedCustomerRoutes } = require("../middlewares/customer-auth");

//import controllers
const {
  getProfileData,
  updateProfileData,
  deleteProfile,
  updateProfilePicture,
} = require("../controllers/profile-customer-controller");

//customer profile routes
router.route("/profile/customer").get(protectedCustomerRoutes, getProfileData);
router
  .route("/profile/customer/update")
  .put(protectedCustomerRoutes, updateProfileData);
router
  .route("/profile/customer/delete")
  .delete(protectedCustomerRoutes, deleteProfile);
router
  .route("/profile/customer/updatepp")
  .put(protectedCustomerRoutes, updateProfilePicture);


//.......................................................
//Wishlist
const {
  getWishlist,
  addToWishList,
  removeItemsFromWishlist,
  addOrder
} = require("../controllers/profile-customer-controller");

router.route("/getWishlist/:id").get(protectedCustomerRoutes,getWishlist);

router.route("/addtoWishlist/:id").put(protectedCustomerRoutes,addToWishList);

 router.route("/removeItemsFromWishlist/:id").put(protectedCustomerRoutes,removeItemsFromWishlist);

 router.route("/addOrder").post(protectedCustomerRoutes,addOrder);

//.......................................................


//Cart
const {
  addToCart,
  getCartItems,
  removeCartItems,
  }  = require("../controllers/profile-customer-controller");

 
  router.route("/addtocart").post(protectedCustomerRoutes,addToCart);

  router.route("/getcartitems").get(protectedCustomerRoutes, getCartItems);
  
  router.route("/removecartitems").post(protectedCustomerRoutes,removeCartItems);
//.......................................................







module.exports = router;
