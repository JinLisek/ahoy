import React from "react";

import { Container } from "react-bootstrap";

import Register from "./Register";
import Login from "./Login";

const NotLoggedInView = () => {
  return (
    <Container>
      <Register />
      <Login />
    </Container>
  );
};

export default NotLoggedInView;
