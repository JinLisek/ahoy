import "./App.css";
import React from "react";

import { Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";

class App extends React.Component {
  constructor() {
    super();
    this.webSocketClient = new WebSocket("wss://localhost:8000/");
  }

  render = () => {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/chat/:room_name" component={Chat} />
      </div>
    );
  };

  openEventListener = (event) => {
    console.log("Received open event on websocket");
  };

  componentDidMount = () => {
    this.webSocketClient.addEventListener("open", this.openEventListener);
  };
}

export default App;
