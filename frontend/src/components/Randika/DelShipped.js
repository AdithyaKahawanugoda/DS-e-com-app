import React, { useState, useEffect } from "react";
import axios from "axios";

const DelShipped = () => {
  const [delOrders, setDelOrders] = useState([]);
  const [cusEmail, setCusEmail] = useState(null);

  const fetchCusEmail = async (cusid, orderId, billAmmount) => {
    alert(cusid);
    await axios
      .get(`http://localhost:6500/ecom/api/adminpvt/getCusEmail/${cusid}`)
      .then((res) => {
        setCusEmail(res.data.email);
        console.log(res.data.email);
        deliver(orderId, res.data.customer, billAmmount);
      })
      .then(alert(cusEmail))
      .catch((err) => {
        alert(err.message);
      });
  };

  const deliver = async (id, customer, ammount) => {
    const status = "Delivered";
    await axios
      .put("http://localhost:6500/ecom/api/adminpvt/updateDeliveryStatus", {
        status: status,
        id: id,
      })
      .then(() => {
        //window.location.reload(false);
        sendMail(status, customer, ammount, id);
      });
  };

  const sendMail = async (st, customer, ammount, id) => {
    const email = customer.email;
    const cusName = customer.username;
    const status = st;
    const billAmmount = ammount;
    const orderId = id;
    await axios
    axios
      .post("http://localhost:6500/ecom/api/adminpvt/EmailController", {
        status: status,
        email: email,
        cusName: cusName,
        billAmmount:billAmmount,
        orderId:orderId,
        
      })
      .then(() => {
        alert("email sent");
      });
  };

  useEffect(() => {
    const getdelOrder = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get("http://localhost:6500/ecom/api/adminpvt/fetchOrders", config)
          .then((res) => {
            setDelOrders(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getdelOrder();
  }, []);
  return (
    <div>
      <h1>Shipped Orders</h1>
      <table className="table border shadow">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Index</th>
            <th scope="col">OrderId</th>
            <th scope="col">Delivery Address</th>
            {/* <th scope="col">Delivery Fee</th> */}
            <th scope="col">Buyer Id</th>
            {/* <th scope="col">Bill Ammount</th> */}
            <th scope="col">Delivery Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {delOrders
            .filter(
              (wrk) =>
                wrk.deliveryStatus[wrk.deliveryStatus.length - 1].status ===
                "Shipped"
            )
            .map((delOrder, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <th>{delOrder._id}</th>
                <th>{delOrder.deliveryAddress}</th>
                {/* <th>{delOrder.deliveryFee}</th> */}
                <th>{delOrder.buyerID}</th>
                {/* <th>{delOrder.billAmount}</th>  */}
                <th>
                  {
                    delOrder.deliveryStatus[delOrder.deliveryStatus.length - 1]
                      .status
                  }
                </th>

                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      fetchCusEmail(delOrder.buyerID, delOrder._id, delOrder.billAmount);
                    }}
                  >
                    Deliver
                  </button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DelShipped;
