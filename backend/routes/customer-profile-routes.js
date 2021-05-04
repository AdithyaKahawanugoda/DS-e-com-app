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

module.exports = router;
