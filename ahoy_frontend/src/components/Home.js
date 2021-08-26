import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roomName: "" };
  }

  handleChangeRoomName = (event) => {
    this.setState({ roomName: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    if (this.state.roomName !== "") this.props.history.push("/chat/" + this.state.roomName);
  };

  render = () => {
    return (
      <div>
        <h1>Create new room</h1>
        <Form onSubmit={this.submit}>
          <Form.Group controlId={"formRoomName"}>
            <Form.Label>Room name</Form.Label>
            <Form.Control type="text" onChange={this.handleChangeRoomName} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create room
          </Button>
        </Form>
      </div>
    );
  };
}
export default Home;
