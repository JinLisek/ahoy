import React from "react";

import { connect } from "react-redux";

import { getBackend } from "common/BackendApiUtilities";

import { loginUser } from "redux-stuff/actions";

import NotLoggedInView from "components/NotLoggedInView";
import LoggedInView from "components/LoggedInView";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  componentDidMount = async () => {
    try {
      const loginResp = await getBackend("authentication/login");
      const { data } = await loginResp;
      console.log(data.message);
      if (data.data) this.props.loginUser(data.data);
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  render = () => {
    if (this.props.userInfo === null) return <NotLoggedInView />;
    return <LoggedInView history={this.props.history} />;
  };
}

const mapStateToProps = ({ authentication }) => {
  return { userInfo: authentication.userInfo };
};
export default connect(mapStateToProps, { loginUser })(App);
