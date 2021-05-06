import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Categories.css";
import { BuildOutlined } from "@ant-design/icons";

const Categories = () => {
  const navigateToProdListing = (category) => {
    localStorage.setItem("selectedCategory", category);
    window.location = "/products";
  };

  return (
    <div className="custom-category-body">
      <Row className="custom-category-title">
        <BuildOutlined style={{ fontSize: "2em" }} />
        <h2>Categories</h2>
      </Row>
      <Row>
        <Col className="custom-home-category-card-style">Women's Fashion</Col>
        <Col className="custom-home-category-card-style">Men's Fashion</Col>
        <Col className="custom-home-category-card-style">Mobile Phones</Col>
        <Col className="custom-home-category-card-style">Computers</Col>
      </Row>
      <Row>
        <Col className="custom-home-category-card-style">
          Consumer Electronics
        </Col>
        <Col className="custom-home-category-card-style">
          Jewelry &amp; watches
        </Col>
        <Col className="custom-home-category-card-style">
          Home, Pet &amp; Appliances
        </Col>
        <Col className="custom-home-category-card-style">Bags &amp; Shoes</Col>
      </Row>
      <Row>
        <Col className="custom-home-category-card-style">
          Toys , Kids &amp; Babies
        </Col>
        <Col className="custom-home-category-card-style">
          Outdoor Fun &amp; Sports
        </Col>
        <Col className="custom-home-category-card-style">
          Beauty, Health &amp; Hair
        </Col>
        <Col className="custom-home-category-card-style">
          Automobiles &amp; Motorcycles
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
