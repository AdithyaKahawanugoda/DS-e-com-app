import React, { useState } from "react";
import { Row, Col } from "antd";
import { Container, ListGroup } from "react-bootstrap";
import CustomerDetails from "../../components/Adithya/CustomerDetails";
import CustomerOrderHistory from "../../components/Adithya/CustomerOrderHistory";
import CustomerInquries from "../../components/Adithya/CustomerInquries";
//import CustomerWishList from "../../components/?????????";

import "./CustomerProfileScreen.css";

const CustomerProfileScreen = () => {
  const [orderHistory, setOrderHistory] = useState(true);
  const [wishList, setWishList] = useState(false);
  const [inquries, setInquries] = useState(false);

  return (
    <div className="custom-cusprof-body">
      <Row>
        <Col span={7}>
          <Row>
            <Container>
              <CustomerDetails />
            </Container>
          </Row>
          <Row>
            <Container>
              <div className="custom-cusprof-navigation-panel">
                <ListGroup defaultActiveKey="#link1">
                  <ListGroup.Item
                    action
                    href="#link1"
                    onClick={() => {
                      setWishList(false);
                      setInquries(false);
                      setOrderHistory(true);
                    }}
                  >
                    Order History
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#link2"
                    onClick={() => {
                      setInquries(false);
                      setOrderHistory(false);
                      setWishList(true);
                    }}
                  >
                    Wish List
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#link3"
                    onClick={() => {
                      setWishList(false);
                      setOrderHistory(false);
                      setInquries(true);
                    }}
                  >
                    Inquries and Disputes
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Container>
          </Row>
        </Col>
        <Col span={17}>
          <Container className="custom-cusprof-dynamic-content-body">
            [content section]
            {orderHistory && <CustomerOrderHistory />}
            {inquries && <CustomerInquries />}
            {/* {wishList && <CustomerWishList />} */}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerProfileScreen;
