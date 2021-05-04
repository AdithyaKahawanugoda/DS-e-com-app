//...............................................................
const Order = require("../models/order-model");
//...............................................................

//...............................................................
//*******Randika*****/
  
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
      const OrderId = req.params.id;
      const status = req.body.status;
    
      const deliveryStatus = {
        status: status
      };
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
          res.status(200).send({ status: "Status fetched", 
          delStatus: (delStatus.deliveryStatus[delStatus.deliveryStatus.length-1].status)});
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .send({ status: "Error in fetching status", error: err.message });
        });
    };

//...............................................................
