const Order = require("../models/order-model");

exports.updateDeliveryStatus = async (req, res) => {
  //const productID = req.params.productID;
  const status = req.body.status;
  const OrderId = req.params.id;

  try {
    const order = await Order.findById(OrderId);
    console.log("Order found:" + order);
  } catch (err) {
    //if our get req has any issues such as missiong information
    console.log(err);
  }

  try {
    await Order.updateOne(
      { _id: OrderId },
      { $push: { deliveryStatus: { status: status } } },
      { new: true, upsert: true }
    );
    res.status(200).send({ status: "Delivery Status Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};
