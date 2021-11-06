import React from "react";

import { connect } from "react-redux";

import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import { getBackend } from "common/BackendApiUtilities";
import { openUserChat } from "redux-stuff/actions";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }
  componentDidMount = async () => {
    await this.getFriends();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.userInfo === prevProps.userInfo) return;

    await this.getFriends();
  };

  getFriends = async () => {
    const userName = this.props.userInfo.username;
    if (!userName || userName === "") {
      console.warn("TRIED TO GET FRIENDS FOR EMPTY USERNAME!!!!!!!!!!!!!!!");
      return;
    }

    try {
      const searchResp = await getBackend(`friends/friends/${userName}`);
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
    <Container>
      <h1>Friends</h1>
      <ListGroup className="me-auto" variant="flush">
        {this.state.friends.map((userName) => (
          <ListGroup.Item action key={userName} as={Button} onClick={() => this.props.openUserChat(userName)}>
            {userName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = ({ authentication }) => {
  return { userInfo: authentication.userInfo };
};
export default connect(mapStateToProps, { openUserChat })(FriendsList);
