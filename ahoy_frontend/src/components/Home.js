import React from "react";

import CreateRoom from "./CreateRoom";
import Register from "./Register";

const Home = (props) => {
  return (
    <div>
      <CreateRoom history={props.history} />
      <Register />
    </div>
  );
};
export default Home;
