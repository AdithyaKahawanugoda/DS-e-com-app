const ProductModel = require("../models/product-model");
const SellerModel = require("../models/seller-model");
const { cloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

//----Deshi------
//CRUD operations of sellerproducts
exports.getSellerProducts = async (req, res) => {
  const { sellerID } = req.params;

  await ProductModel.find({ sellerID: sellerID }).exec((error, products) => {
    if (error) {
      return res.status(400).json({ error });
    }
    res.status(200).json({ products });
  });
};
exports.createSellerProduct = async (req, res) => {
  const {
    productName,
    category,
    productDetails,
    unitPrice,
    discountPercentage,
    quantity,
    productImgEnc,
  } = req.body;

  //file upload
  const uploadedResponse = await cloudinary.uploader.upload(productImgEnc, {
    upload_preset: "GRID_DS_Products",
  });

  try {
    const product = await ProductModel.create({
      sellerID: req.user._id,
      productName,
      category,
      productDetails,
      unitPrice,
      discountPercentage,
      quantity,
      productImage: {
        imagePublicId: uploadedResponse.public_id,
        imageSecURL: uploadedResponse.secure_url,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json({
      success: false,
      desc: "Error in adding product",
      error: error.message,
    });
  }
};
exports.updateSellerproduct = async (req, res) => {
  const { id } = req.params;

  const {
    productName,
    category,
    productDetails,
    unitPrice,
    discountPercentage,
    quantity,
    productImgEnc,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  //file upload
  const uploadedResponse = await cloudinary.uploader.upload(productImgEnc, {
    upload_preset: "GRID_DS_Products",
  });

  const updatedProduct = {
    sellerID: req.user._id,
    productName,
    category,
    productDetails,
    unitPrice,
    discountPercentage,
    quantity,
    productImage: {
      imagePublicId: uploadedResponse.public_id,
      imageSecURL: uploadedResponse.secure_url,
    },
    _id: id,
  };

  await ProductModel.findByIdAndUpdate(id, updatedProduct, { new: true });

  res.json(updatedProduct);
};
exports.deleteSellerProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  await ProductModel.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

//CRUD operations of seller details
exports.getSellerDetails = async (req, res) => {
  const { sellerID } = req.params;

  try {
    const seller = await SellerModel.findById(sellerID);

    res.status(200).json(seller);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.updateSellerDetails = async (req, res) => {
  const { id } = req.params;

  const {
    username,
    email,
    password,
    paymentOptions,
    address,
    phone,
  } = req.body;

  const updateSeller = {
    username,
    email,
    password,
    paymentOptions,
    address,
    phone,
  };

  await SellerModel.findByIdAndUpdate(id, updateSeller, { new: true });

  res.json(updatedProduct);
};

exports.deleteSellerDetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  await SellerModel.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

//----------------
