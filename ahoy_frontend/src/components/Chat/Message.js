import { Link } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

const Message = (props) => (
  <ListGroup.Item style={{ padding: 0 }}>
    <ListGroup horizontal>
      <ListGroup.Item as={Link} to={"/user/" + props.author} className="bg-dark text-light border-0">
        {props.author}
      </ListGroup.Item>
      <ListGroup.Item className="border-0">{props.message}</ListGroup.Item>
    </ListGroup>
  </ListGroup.Item>
);

export default Message;
