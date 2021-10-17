import React from "react";

import Container from "react-bootstrap/Container";

import { getBackend } from "../common/BackendApiUtilities";

import UserEntry from "./UserEntry";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { foundUsers: [] };
  }

  componentDidMount = async () => {
    await this.requestSearch();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.match.params.searchPhrase === prevProps.match.params.searchPhrase) return;

    await this.requestSearch();
  };

  requestSearch = async () => {
    const searchPhrase = this.props.match.params.searchPhrase;
    if (!searchPhrase || searchPhrase === "") {
      console.warn("TRIED TO SEARCH WITH EMPTY STRING!!!!!!!!!!!!!!!");
      return;
    }

    try {
      const searchResp = await getBackend(`search/${searchPhrase}`);
      const { data } = await searchResp;
      console.log("Found: ", data.users);
      this.setState({ foundUsers: data.users });
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
        {this.state.foundUsers.map((user) => (
          <UserEntry key={"userLabel" + user["username"]} username={user["username"]} />
        ))}
      </Container>
    );
  };
}

export default SearchPage;
