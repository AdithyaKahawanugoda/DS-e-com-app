const CustomerModel = require("../models/customer-model");
const AllUsersModel = require("../models/all-users-model");
const { cloudinary } = require("../utils/cloudinary");

exports.getProfileData = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(422).json({
        success: false,
        error: "Can not find the user - Please check again",
      });
    } else {
      res.status(200).send({
        researcher: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error in getProfileData controller-" + error,
    });
  }
};
exports.updateProfileData = async (req, res, next) => {
  console.log("Check update prof data, req body=" + req.body);
  console.log("Check update prof data, req user.id=" + req.user.id);
  console.log("Check update prof data, req user._id=" + req.user._id);
  const { username, email, contactNo, address } = req.body;
  try {
    const newData = {
      username,
      email,
      phone: contactNo,
      address,
    };
    const updatedUser = await CustomerModel.findByIdAndUpdate(
      req.user.id,
      newData
    );
    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error in updateProfileData controller-" + error,
    });
  }
};
exports.deleteProfile = async (req, res, next) => {
  const { email } = req.body;
  try {
    await CustomerModel.findByIdAndDelete(req.user.id);
    const allUserData = await AllUsersModel.findOne({ email });
    const deletedAllUser = await CustomerModel.findByIdAndDelete(
      allUserData._id
    );
    await cloudinary.uploader.destroy(req.user.profilePicture.imagePublicId);

    res.status(200).send({
      status: true,
      message: "User deleted from the db",
      deletedCustomer,
      deletedAllUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error in deleteProfile controller-" + error,
    });
  }
};
exports.updateProfilePicture = async (req, res, next) => {
  const { fileEnc } = req.body;

  try {
    await cloudinary.uploader.destroy(req.user.profilePicture.imagePublicId);
    const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
      upload_preset: "GRID_DS_Registration",
    });
    let updatedPP = {
      imagePublicId: uploadedResponse.public_id,
      imageSecURL: uploadedResponse.secure_url,
    };
    const updated = await CustomerModel.findByIdAndUpdate(req.user._id, {
      profilePicture: updatedPP,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error in updateProfilePicture controller-" + error,
    });
  }
};
