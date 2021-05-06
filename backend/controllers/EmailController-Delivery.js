const sendEmail = require("../utils/SendEmail-Delivery");

exports.EmailController = async (req, res, next) => {
  const { email, status } = req.body;
  let message;

  try {
    switch (status) {
      case "Pending":
        message = `
              Your Order Is Processing.
          `;
        break;

      case "Shipped":
        message = `
                    Your Order Has Been Shipped.
                  `;
        break;
      case "Delivered":
        message = `
                  <h1>Your Order Has Been Delivered</h1>
                `;
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
        subject: "Test Mail",
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
