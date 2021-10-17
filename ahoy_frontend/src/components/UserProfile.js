import React from "react";

import Container from "react-bootstrap/Container";

import { getBackend } from "../common/BackendApiUtilities";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }
  componentDidMount = async () => {
    await this.getFriends();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.match.params.username === prevProps.match.params.username) return;

    await this.getFriends();
  };

  getFriends = async () => {
    const username = this.props.match.params.username;
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

  render = () => {
    return (
      <Container>
        <h1>Friends</h1>
        {this.state.friends.map((username) => (
          <p key={username}>{username}</p>
        ))}
      </Container>
    );
  };
}
export default UserProfile;
