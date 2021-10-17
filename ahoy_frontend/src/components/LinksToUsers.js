import { Link } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

const LinksToUsers = (props) => {
  return (
    <ListGroup className="me-auto" variant="flush">
      {props.users.map((username) => (
        <ListGroup.Item action key={username} as={Link} to={`/user/${username}`}>
          {username}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default LinksToUsers;
