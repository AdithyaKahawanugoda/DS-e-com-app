const express = require("express");
const router = express.Router();

const { getSingleProduct } = require("../controllers/guest-data-controller");

router.route("/getSingleProduct/:id").get(getSingleProduct);


module.exports = router;