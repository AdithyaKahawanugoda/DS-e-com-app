const CustomerModel = require("../models/customer-model");
const SellerModel = require("../models/seller-model");
const AdminModel = require("../models/admin-model");

exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;
  console.log("ROLE" + role);
  //check user
  let user;
  if (role === "admin") {
    console.log("check admin collection");
    user = await AdminModel.findOne({ email: email }).select("+password");
    console.log("check fetched user val: " + user);
  } else if (role === "customer") {
    console.log("check customers collection");
    user = await CustomerModel.findOne({ email: email }).select("+password");
    console.log("check fetched user val: " + user);
  } else if (role === "seller") {
    console.log("check sellers collection");
    user = await SellerModel.findOne({ email: email }).select("+password");
    console.log("check fetched user val: " + user);
  } else {
    res.status(422).json({
      success: false,
      error: "Can not find the user - Please check again",
    });
  }
  //check password match
  try {
    const isMatch = await user.matchPasswords(password);
    console.log("ISPASSMATCH=" + isMatch);
    if (!isMatch) {
      res.status(401).send({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    console.log("Error Occured in login controller-password match checker");
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  console.log("token=" + token);
  res.status(statusCode).json({ sucess: true, token, user });
};
