import axios from "axios";
import Cookies from "universal-cookie";

import React from "react";

import Container from "react-bootstrap/Container";

import UserEntry from "./UserEntry";

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { foundUsers: [] };
  }

  componentDidMount = async () => {
    const searchRegex = /\/search\/(?<searchText>.*)/;
    const searchText = this.props.history.location.pathname.match(searchRegex).groups["searchText"];
    const cookies = new Cookies();
    const csrfCookie = cookies.get("csrftoken");

    if (searchText === "") {
      console.warn("TRIED TO SEARCH WITH EMPTY STRING!!!!!!!!!!!!!!!");
      return;
    }

    try {
      const loginResp = await axios({
        method: "get",
        url: `http://192.168.1.165:8000/search/${searchText}/`,
        withCredentials: true,
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken",
        headers: { "X-CSRFToken": csrfCookie },
      });
      const { data } = await loginResp;
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

export default SearchView;
