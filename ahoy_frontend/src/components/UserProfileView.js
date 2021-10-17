import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import LinksToUsers from "./LinksToUsers";

const UserProfileView = (props) => {
  return (
    <Container>
      <h1>Profile: {props.username}</h1>
      {props.shouldRenderFriendRequest && (
        <Button onClick={() => props.sendFriendRequest(props.username)}>Ask {props.username} to become friends</Button>
      )}
      <h2>Friends</h2>
      <LinksToUsers users={props.friends} />
    </Container>
  );
};

export default UserProfileView;
