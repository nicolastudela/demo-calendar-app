import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-container">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            <code>Demo calendar App</code>
          </h1>
          {/* <a
            className="App-link"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </div>
      </header>
      <Calendar></Calendar>
    </div>
  );
}

export default App;
