const CustomerModel = require("../models/customer-model");
const SellerModel = require("../models/seller-model");
const { cloudinary } = require("../utils/cloudinary");

exports.registerCustomer = async (req, res, next) => {
  const { username, email, password, fileEnc, contactNo } = req.body;

  console.log("fileEnc:" + fileEnc);

  //check for users with same email address within customer collection
  let existingEmail;
  try {
    existingEmail = await CustomerModel.findOne({ email: email });
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in duplicate email check code segment",
      error: err.message,
    });
  }

  if (existingEmail) {
    existingEmail = null;
    res.status(422).json({
      success: false,
      desc: "Email already exist - Please check again",
    });
  } else {
    try {
      //file upload
      const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "GRID_DS_Registration",
      });

      const customer = await CustomerModel.create({
        username,
        email,
        password,
        phone: contactNo,
        profilePicture: {
          imagePublicId: uploadedResponse.public_id,
          imageSecURL: uploadedResponse.secure_url,
        },
      });

      const token = await customer.getSignedToken();

      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerCustomer controller",
        error: error.message,
      });
    }
  }
};

exports.registerSeller = async (req, res, next) => {
  const { username, email, password, address, contactNo } = req.body;

  //check for users with same email address within customer collection
  let existingEmail;
  try {
    existingEmail = await SellerModel.findOne({ email: email });
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in duplicate email check code segment",
      error: err.message,
    });
  }

  if (existingEmail) {
    existingEmail = null;
    res.status(422).json({
      success: false,
      desc: "Email already exist - Please check again",
    });
  } else {
    try {
      const seller = await SellerModel.create({
        username,
        email,
        password,
        phone: contactNo,
        address,
      });
      const token = await seller.getSignedToken();
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in registerCustomer controller",
        error: error.message,
      });
    }
  }
};
