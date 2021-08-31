import React from "react";

import CreateRoom from "./CreateRoom";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

const Home = (props) => {
  return (
    <div>
      <CreateRoom history={props.history} />
      <Register />
      <Login />
      <Logout />
    </div>
  );
};
export default Home;
