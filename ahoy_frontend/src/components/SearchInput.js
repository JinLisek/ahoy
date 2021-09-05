import React from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = { searchText: "" };
  }

  handleChangeSearchText = (event) => {
    this.setState({ searchText: event.target.value });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.props.history.push("/search/" + this.state.searchText);
  };

  render = () => (
    <Container>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId={"formSearch"}>
          <Form.Control placeholder="search" type="text" onChange={this.handleChangeSearchText} />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default SearchInput;
