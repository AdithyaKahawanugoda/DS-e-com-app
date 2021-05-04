const CustomerModel = require("../models/customer-model");
const AllUsersModel = require("../models/all-users-model");
const { cloudinary } = require("../utils/cloudinary");

//----Adithya------
exports.getProfileData = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(422).json({
        success: false,
        desc: "Can not find the user - Please check again",
      });
    } else {
      res.status(200).send({
        researcher: req.user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getProfileData controller-" + error,
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
      desc: "user updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateProfileData controller-" + error,
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
      desc: "User deleted from the db",
      deletedCustomer,
      deletedAllUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleteProfile controller-" + error,
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
      desc: "Error in updateProfilePicture controller-" + error,
    });
  }
};
//----------------

//----Randika------

//fetch wishlist
exports.getWishlist = async (req, res) => {
  let cusId = req.params.id;
  await CustomerModel.findById(cusId)
    .then((customer) => {
      res
        .status(200)
        .send({ status: "Customer fetched", wishlist: customer.wishList });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error in fetching customer", error: err.message });
    });
};

//add to wishlist
exports.addToWishList = async (req, res) => {
  const productID = req.body.productID;
  const CustomerId = req.params.id;

  try {
    const wishlist = {
      productID: productID,
    };

    await CustomerModel.findOneAndUpdate(
      { _id: CustomerId },
      { $push: { wishList: wishlist } }
    );
    res.status(200).send({ status: "Product Added to Wishlist", wishlist });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};

//remove items from wishlist
exports.removeItemsFromWishlist = async (req, res) => {
  const itemId = req.params.id;
  try {
    const customer = req.body.id;

    const deleteWishlistItem = await CustomerModel.updateOne(
      { _id: customer },
      { $pull: { wishList: { _id: itemId } } }
    );

    res.status(200).send({
      status: "product removed from the list",
      wishlist: deleteWishlistItem,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
};

//----------------
