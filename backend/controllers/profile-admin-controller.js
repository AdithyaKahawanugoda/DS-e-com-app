const Order = require("../models/order-model");
const Customer = require("../models/customer-model");
const sendEmail = require("../utils/SendEmail-Delivery");

//----Randika------

//fetch Orders
exports.fetchOrders = async (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
};

//fetch single order
exports.fetchSingleOrder = async (req, res) => {
  let OrderId = req.params.id;

  await Order.findById(OrderId)
    .then((order) => {
      res.status(200).send({ status: "Order fetched", order });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error in fetching Order", error: err.message });
    });
};
//to gest

exports.updateDeliveryStatus = async (req, res) => {
  const OrderId = req.body.id;
  const status = req.body.status;
  console.log(OrderId);
  console.log(status);
  const deliveryStatus = {
    status: status,
  };
  console.log(deliveryStatus);
  try {
    await Order.findOneAndUpdate(
      { _id: OrderId },
      { $push: { deliveryStatus: deliveryStatus } }
    );
    res.status(200).send({ status: "Delivery Status Updated", deliveryStatus });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};

//fetch last delivery status

exports.fetchDeliveryStatus = async (req, res) => {
  let orderId = req.params.id;
  await Order.findById(orderId)
    .then((delStatus) => {
      res.status(200).send({
        status: "Status fetched",
        delStatus:
          delStatus.deliveryStatus[delStatus.deliveryStatus.length - 1].status,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error in fetching status", error: err.message });
    });
};

exports.getCusEmail = async (req, res) => {
  let cusId = req.params.id;
  await Customer.findById(cusId)
    .then((customer) => {
      console.log(customer.email);
      res.status(200).send({ status: "Customer fetched", customer: customer });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error in fetching customer", error: err.message });
    });
};
//send emails when delivery status updated
exports.EmailController = async (req, res, next) => {
  const { email, status, cusName, billAmmount, orderId } = req.body;
  let message;

  try {
    switch (status) {
      case "Pending":
        message = `
              Your Order Is Processing.
          `;
        break;

      case "Shipped":
        message = `Dear ${cusName},<br />  We are pleased to share that the item(s) from your order ${orderId} have been shipped.
                    Please ready Rs.${billAmmount}.
                    Your order will be delivered to you within 4 working days.
                    Thanks for shopping with us
                  `;
        subject = `
                  Your Order Has Been Shipped!`;
        break;
      case "Delivered":
        message = `Dear ${cusName},<br />
        <h4>We are pleased to inform that your order ${orderId}
         has been delivered.
        We hope you are enjoying your recent 
        purchase! Once you have a chance, we would
         love to hear your shopping experience to 
         keep us constantly improving</h4>`;

        subject = `Your Order Has Been Delivered!`;
        break;
      case "Returned":
        message = `
                    <h1>Your Order Has Been Returned</h1>
                  `;
        break;

      default:
        break;
    }
    // HTML Message

    try {
      await sendEmail({
        to: email,
        subject: subject,
        text: message,
      });

      res.status(200).send({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      res.status(500).send({
        success: false,
        error: "Email could not be sent!",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//----------------
