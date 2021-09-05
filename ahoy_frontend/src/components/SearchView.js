import axios from "axios";
import Cookies from "universal-cookie";

import React from "react";

import Container from "react-bootstrap/Container";

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
    let users = [];
    let userCounter = 1;
    for (const user of this.state.foundUsers) {
      users.push(<h3 key={"userLabel" + userCounter++}>{user["username"]}</h3>);
    }
    return <Container>{users}</Container>;
  };
}

export default SearchView;
