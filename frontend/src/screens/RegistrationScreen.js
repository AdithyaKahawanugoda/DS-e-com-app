import React from "react";
import "./RegistrationScreen.css";
import { Row, Col } from "antd";

import Registration from "../components/Registration";

const RegistrationScreen = () => {
  return (
    <div className="reg-body">
      <Row>
        <Col span={24}>Sign Up Page</Col>
      </Row>
      <Row>
        <Col span={12} lg={12} md={24} sm={24} xs={24}>
          <Registration />
        </Col>
        <Col span={12} lg={12} md={24} sm={24} xs={24}>
          Boruwata Image
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationScreen;
