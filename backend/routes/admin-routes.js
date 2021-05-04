const express = require("express");
const router = express.Router();
const {protectedAdminRoutes} = require('../middlewares/admin-auth')

const {
  fetchOrders,
  fetchSingleOrder,
  updateDeliveryStatus,
  fetchDeliveryStatus
} = require("../controllers/profile-admin-controller");


router.route("/fetchOrders").get(protectedAdminRoutes,fetchOrders);

router.route("/fetchDeliveryStatus/:id").get(protectedAdminRoutes,fetchDeliveryStatus);

router.route("/fetchSingleOrder/:id").get(protectedAdminRoutes,fetchSingleOrder);

router.route("/updateDeliveryStatus/:id").put(protectedAdminRoutes,updateDeliveryStatus);

module.exports = router;
