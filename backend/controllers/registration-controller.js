const CustomerModel = require("../models/customer-model");
const { cloudinary } = require("../utils/cloudinary");

exports.registerCustomer = async (req, res, next) => {
  const { username, email, password, fileEnc, contactNo } = req.body;

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
      console.log("1111");
      console.log("FILEENC:" + fileEnc);
      //file upload
      const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
        upload_preset: "GRID_DS_Registration",
      });

      console.log("pubID:" + uploadedResponse.public_id);
      console.log("secURL:" + uploadedResponse.secure_url);

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
      console.log("Received Token:" + token);
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
};
