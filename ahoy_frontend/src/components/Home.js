import React from "react";

import CreateRoom from "./CreateRoom";

const Home = (props) => {
  return (
    <div>
      <CreateRoom history={props.history} />
    </div>
  );
};
export default Home;
