import axios from "axios";
import Cookies from "universal-cookie";
import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Logout extends React.Component {
  onSubmit = async (event) => {
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
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  render = () => {
    return (
      <div>
        <h1>Logout</h1>
        <Form onSubmit={this.onSubmit}>
          <Button variant="primary" type="submit">
            Logout
          </Button>
        </Form>
      </div>
    );
  };
}
export default Logout;