import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

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
    if (this.props.username === prevProps.username) return;

    await this.getFriends();
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

  render = () => {
    return (
      <Container>
        <h1>Profile: {this.props.username}</h1>
        <h2>Friends</h2>
        <ListGroup className="me-auto" variant="flush">
          {this.state.friends.map((username) => (
            <ListGroup.Item action key={username} as={Link} to={`/user/${username}`}>
              {username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  };
}
export default UserProfile;
