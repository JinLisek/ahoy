import React from "react";

import { connect } from "react-redux";

import Button from "react-bootstrap/Button";

import { getBackend } from "common/BackendApiUtilities";
import { logoutUser } from "redux-stuff/actions";

class Logout extends React.Component {
  logout = async (event) => {
    event.preventDefault();

    try {
      const logoutResp = await getBackend("authentication/logout");
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
    return <Button onClick={this.logout}>Logout</Button>;
  };
}

export default connect(null, { logoutUser })(Logout);
