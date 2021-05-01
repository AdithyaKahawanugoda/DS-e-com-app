const express = require("express");
const router = express.Router();

//import controllers
const {
  registerCustomer,
  registerSeller,
} = require("../controllers/registration-controller");
const { login } = require("../controllers/login-controller");

//import protected-routes middlewares
const { protectedAdminRoutes } = require("../middlewares/admin-auth");
const { protectedCustomerRoutes } = require("../middlewares/customer-auth");
const { protectedSellerRoutes } = require("../middlewares/seller-auth");

//Registration-routes
router.route("/reg-customer").post(registerCustomer);
router.route("/reg-seller").post(registerSeller);
//Login-routes
router.route("/login").post(login);
//Profile-routes
router.route("/profile/admin").get(protectedAdminRoutes);
router.route("/profile/customer").get(protectedCustomerRoutes);
router.route("/profile/seller").get(protectedSellerRoutes);

module.exports = router;
