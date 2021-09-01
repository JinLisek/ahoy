import axios from "axios";
import Cookies from "universal-cookie";
import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", email: "", password: "" };
  }

  handleChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const csrfCookie = cookies.get("csrftoken");

    if (this.state.userName === "" || this.state.email === "" || this.state.password === "") {
      console.warn("TRIED TO REGISTER WITH SOMETHING EMPTY!!!!!!!!!!!!!!!");
      return;
    }

    const requestData = { username: this.state.userName, email: this.state.email, password: this.state.password };

    try {
      const registerResp = await axios({
        method: "post",
        url: "http://192.168.1.165:8000/authentication/register",
        data: requestData,
        withCredentials: true,
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken",
        headers: { "X-CSRFToken": csrfCookie },
      });
      const { data } = await registerResp;
      console.log("Register response: " + data);
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
        <h1>Register</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId={"formRegisterUserName"}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={this.handleChangeUserName} />
          </Form.Group>
          <Form.Group controlId={"formRegisterEmail"}>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" onChange={this.handleChangeEmail} />
          </Form.Group>
          <Form.Group controlId={"formRegisterPassword"}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" onChange={this.handleChangePassword} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  };
}
export default Register;
