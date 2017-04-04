import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";

var json = require("../data/apikey.json");

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
    }
  }

  render() {
    return (
      <div> 
        <CompanyButton/>
        <Graph/>
        <Info/>
      </div>
    );
  }
}

class CompanyButton extends Component {
  render() {
    return (
      <button
        type="button"
      >
        Facebook
      </button>
    );
  }
}

class Graph extends Component {
  render() {
    return (
      <div> GRAPH </div>
    );
  }
}

class Info extends Component {
  render() {
    return (
      <div> INFO </div>
    );
  }
}

export default App;
