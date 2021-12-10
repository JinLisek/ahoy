import React from "react";

import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { postBackend } from "common/BackendApiUtilities";
import { loginUser } from "redux-stuff/actions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "" };
  }

  handleChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    if (this.state.userName === "" || this.state.password === "") {
      console.warn("TRIED TO LOGIN WITH SOMETHING EMPTY!!!!!!!!!!!!!!!");
      return;
    }

    const requestData = { username: this.state.userName, password: this.state.password };

    try {
      const loginResp = await postBackend("authentication/login", requestData);
      const { data } = await loginResp;
      console.log(data.message);
      this.props.loginUser(data.data);
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
        <h1>Login</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId={"formLoginUserName"}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={this.handleChangeUserName} />
          </Form.Group>
          <Form.Group controlId={"formLoginPassword"}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" onChange={this.handleChangePassword} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  };
}

export default connect(null, { loginUser })(Login);
