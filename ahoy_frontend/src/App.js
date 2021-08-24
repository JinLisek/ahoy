import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.webSocketClient = new WebSocket("wss://localhost:8000/");
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          BLAX
        </header>
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
