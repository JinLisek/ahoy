import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const UserProfileView = (props) => {
  return (
    <Container>
      <h1>Profile: {props.username}</h1>
      {props.shouldRenderFriendRequest && (
        <Button onClick={() => props.sendFriendRequest(props.username)}>Ask {props.username} to become friends</Button>
      )}
      <h2>Friends</h2>
      <ListGroup className="me-auto" variant="flush">
        {props.friends.map((friendName) => (
          <ListGroup.Item action key={friendName} as={Link} to={`/user/${friendName}`}>
            {friendName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserProfileView;
