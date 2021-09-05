import axios from "axios";
import Cookies from "universal-cookie";
import React from "react";

import { connect } from "react-redux";

import Button from "react-bootstrap/Button";

import { logoutUser } from "../redux-stuff/actions";

class Logout extends React.Component {
  logout = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const csrfCookie = cookies.get("csrftoken");

    const requestData = {};

    try {
      const logoutResp = await axios({
        method: "post",
        url: "http://192.168.1.165:8000/authentication/logout",
        data: requestData,
        withCredentials: true,
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken",
        headers: { "X-CSRFToken": csrfCookie },
      });
      const { data } = await logoutResp;
      console.log("Logout response: " + data);
      this.props.logoutUser();
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  render = () => {
    return (
      <Button variant="primary" type="submit" onClick={this.logout}>
        Logout
      </Button>
    );
  };
}

export default connect(null, { logoutUser })(Logout);
