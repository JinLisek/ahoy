import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

const UserProfileView = (props) => {
  return (
    <Container>
      <h1>Profile: {props.username}</h1>
      <h2>Friends</h2>
      <ListGroup className="me-auto" variant="flush">
        {props.friends.map((username) => (
          <ListGroup.Item action key={username} as={Link} to={`/user/${username}`}>
            {username}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserProfileView;
