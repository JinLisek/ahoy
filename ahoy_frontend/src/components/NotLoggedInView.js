import React from "react";

import { Container } from "react-bootstrap";

import Register from "components/Register";
import Login from "components/Login";

const NotLoggedInView = () => {
  return (
    <Container>
      <Register />
      <Login />
    </Container>
  );
};

export default NotLoggedInView;
