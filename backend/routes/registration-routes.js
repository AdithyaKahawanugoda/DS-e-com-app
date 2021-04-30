const express = require("express");
const router = express.Router();

//import controllers
const { registerCustomer } = require("../controllers/registration-controller");

//import middlewares
const { protect } = require("../middlewares/customer-auth");

//routes
router.route("/reg-customer").post(registerCustomer);

module.exports = router;
