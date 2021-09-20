import React from "react";

import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import { getBackend, postBackend } from "../common/BackendApiUtilities";

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

  acceptFriendRequest = (acceptedFriendUsername) => async () => {
    try {
      const requestData = { username: acceptedFriendUsername };
      console.log("SENDING username: " + acceptedFriendUsername);
      const acceptFriendshipResp = await postBackend("friends/accept", requestData);
      const { data } = await acceptFriendshipResp;
      console.log("ACCEPT FRIEND RESP: " + data.message);
      // this.setState({ friendRequests: data.friend_requests });
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  rejectFriendRequest = (rejectedFriendUsername) => async () => {
    try {
      const requestData = { username: rejectedFriendUsername };
      console.log("SENDING username: " + rejectedFriendUsername);
      const rejectFriendshipResp = await postBackend("friends/reject", requestData);
      const { data } = await rejectFriendshipResp;
      console.log("REJECT FRIEND RESP: " + data.message);
      // this.setState({ friendRequests: data.friend_requests });
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
        <NavDropdown.Item key={"friendRequestFrom" + requester}>
          Friend request from {requester}
          <Button className="m-1" onClick={this.acceptFriendRequest(requester)}>
            Accept
          </Button>
          <Button className="m-1" onClick={this.rejectFriendRequest(requester)}>
            Reject
          </Button>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default Notifications;
