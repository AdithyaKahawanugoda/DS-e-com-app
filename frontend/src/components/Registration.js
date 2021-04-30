import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import FileBase from "react-file-base64";
import "./Registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [enc2Data, setEnc2Data] = useState(null);
  const [error, setError] = useState("");

  const registrationHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    } else if (
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      phone.trim().length === 0 ||
      enc2Data === null
    ) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (!phone.trim().match("^[0][0-9]*$") || phone.trim().length < 10) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please provide valid contact number");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please use a password with at least 6 characters");
    } else {
      let reqObject = {
        username: username,
        email: email,
        password: password,
        fileEnc: enc2Data,
        contactNo: phone,
      };

      await axios
        .post("http://localhost:6500/ecom/api/reg-customer", reqObject)
        .then((res) => {
          alert("Registration Success, response obj:" + res);
        })
        .catch((err) => {
          alert("ERROR! " + err);
        });
    }
  };

  return (
    <div className="reg-form-body">
      <Form onSubmit={registrationHandler}>
        {error && <span className="error-message">{error}</span>}
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We won't share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md={6} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password with at least 6 characters"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col md={7}>
            <Form.Group controlId="phone">
              <Form.Label>Contact no.</Form.Label>
              <Form.Control
                type="text"
                placeholder="0xx-xxxxxxx"
                maxLength="10"
                minLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group controlId="fileupload">
          <Form.Label>File upload</Form.Label>
          <h6>**Please do not exceed the amount of file size 25MB </h6>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setEnc2Data(base64);
            }}
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Registration;
