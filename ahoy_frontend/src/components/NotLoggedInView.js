import axios from "axios";
import Cookies from "universal-cookie";
import React from "react";

import { connect } from "react-redux";

import { Container } from "react-bootstrap";

import { loginUser } from "../redux-stuff/actions";

import Register from "./Register";
import Login from "./Login";

class NotLoggedInView extends React.Component {
  componentDidMount = async () => {
    const cookies = new Cookies();
    const csrfCookie = cookies.get("csrftoken");

    try {
      const loginResp = await axios({
        method: "get",
        url: "http://192.168.1.165:8000/authentication/login",
        withCredentials: true,
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken",
        headers: { "X-CSRFToken": csrfCookie },
      });
      const { data } = await loginResp;
      console.log(data.message);
      if (data.data) this.props.loginUser(data.data);
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  render = () => {
    return (
      <Container>
        <Register />
        <Login />
      </Container>
    );
  };
}

export default connect(null, { loginUser })(NotLoggedInView);
