import React from "react";
import { ListGroup, Button, Col, Row } from "react-bootstrap";
import "./CustomerDetails.css";

const CustomerDetails = () => {
  return (
    <div className="custom-cusprof-navigation-panel">
      <ListGroup variant="flush">
        <ListGroup.Item className="custom-cusprof-pp">
          <img
            className="custom-cusprof-pp-img "
            src="https://i.ibb.co/cFKDK65/anime-boy-cute-png-Transparent-Images.png"
          />
        </ListGroup.Item>
        <ListGroup.Item>Username</ListGroup.Item>
        <ListGroup.Item>Email</ListGroup.Item>
        <ListGroup.Item>Delivery Address</ListGroup.Item>
        <ListGroup.Item>Phone</ListGroup.Item>
        <ListGroup.Item>
          <Button size="sm" variant="outline-primary">
            Edit Details
          </Button>{" "}
          <Button size="sm" variant="outline-danger">
            Delete Account
          </Button>{" "}
          <Button size="sm" variant="outline-success">
            Update Picture
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default CustomerDetails;
