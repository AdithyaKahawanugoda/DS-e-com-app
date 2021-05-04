import React from "react";
import { Container, Row } from "react-bootstrap";

import Categories from "../components/Categories";
import CoverImageSlider from "../components/CoverImageSlider";

const HomeScreen = () => {
  return (
    <div>
      <CoverImageSlider />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Categories />
        </Row>
        <Row className="justify-content-md-center">
          <h3>Our Services</h3>
        </Row>
        <Row className="justify-content-md-center">
          <h3>About Us</h3>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
