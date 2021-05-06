const express = require("express");
const router = express.Router();
const {protectedAdminRoutes} = require('../middlewares/admin-auth')

const {
  fetchOrders,
  fetchSingleOrder,
  updateDeliveryStatus,
  fetchDeliveryStatus,
  getCusEmail,
  EmailController
} = require("../controllers/profile-admin-controller");



router.route("/fetchOrders").get(protectedAdminRoutes,fetchOrders);

router.route("/fetchDeliveryStatus/:id").get(protectedAdminRoutes,fetchDeliveryStatus);

router.route("/fetchSingleOrder/:id").get(protectedAdminRoutes,fetchSingleOrder);

router.route("/updateDeliveryStatus").put(protectedAdminRoutes,updateDeliveryStatus);

router.route("/EmailController").post(protectedAdminRoutes,EmailController);

router.route("/getCusEmail/:id").get(protectedAdminRoutes,getCusEmail);

module.exports = router;
