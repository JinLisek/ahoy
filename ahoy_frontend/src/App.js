import "./App.css";
import React from "react";

import { Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import SearchView from "./components/SearchView";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:searchText" component={SearchView} />
      <Route exact path="/chat/:roomName" component={Chat} />
    </div>
  );
};

export default App;
