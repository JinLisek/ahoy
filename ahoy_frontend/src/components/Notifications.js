import React from "react";

import NavDropdown from "react-bootstrap/NavDropdown";

import { getBackend } from "../common/BackendApiUtilities";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friendRequests: [] };
  }

  componentDidMount = async () => {
    await this.requestNotifications();
  };

  requestNotifications = async () => {
    try {
      const notificationsResp = await getBackend("friends/requests");
      const { data } = await notificationsResp;
      this.setState({ friendRequests: data.friend_requests });
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  render = () => (
    <NavDropdown title="Notifications">
      {this.state.friendRequests.map((requester) => (
        <NavDropdown.Item key={"friendRequestFrom" + requester}>{requester}</NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default Notifications;
