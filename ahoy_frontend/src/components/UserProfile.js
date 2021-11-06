import React from "react";
import { connect } from "react-redux";

import UserProfileView from "./UserProfileView";

import { getBackend, postBackend } from "../common/BackendApiUtilities";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }
  componentDidMount = async () => {
    await this.getFriends();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.username === prevProps.username) return;

    await this.getFriends();
  };

  sendFriendRequest = async (username) => {
    const requestData = { username };
    try {
      await postBackend("friends/request", requestData);
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  getFriends = async () => {
    const username = this.props.username;
    if (!username || username === "") {
      console.warn("TRIED TO GET FRIENDS FOR EMPTY USERNAME!!!!!!!!!!!!!!!");
      return;
    }

    try {
      const searchResp = await getBackend(`friends/friends/${username}`);
      const { data } = await searchResp;
      this.setState({ friends: data.friends });
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  render = () => (
    <UserProfileView
      shouldRenderFriendRequest={this.props.userInfo.username !== this.props.username}
      username={this.props.username}
      friends={this.state.friends}
      sendFriendRequest={this.sendFriendRequest}
    />
  );
}

const mapStateToProps = ({ authentication }) => {
  return { userInfo: authentication.userInfo };
};
export default connect(mapStateToProps)(UserProfile);
