import React, { Component } from 'react';
import { getApiKey } from './ApiKey'
import './App.css';
import * as d3 from "d3";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
