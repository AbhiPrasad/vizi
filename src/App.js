import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";

const json = require("../data/apiKey.json");

const URL_BASE = 'https://www.quandl.com/api/v3/datasets/';
const DATABASE_CODE = 'WIKI';
const DATASET_CODE = 'FB';
const DATA_FORMAT = 'json';
const URL_COLOMN = 'column_index';
const URL_START = 'start_date';
const URL_END = 'end_date';
const URL_COLLAPSE = 'collapse';
const URL_TRANSFORM = 'transform';
const URL_API = 'api_key';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      apiKey: json.apiKey,
      column: '4',
      start_date: '2014-01-01',
      end_date: '2014-12-31',
      collapse: 'monthly',
      transform: 'rdiff',
    }

    this.apiCall = this.apiCall.bind(this);
    this.setResult = this.setResult.bind(this);
  }

  apiCall() {
    const { apiKey, column, start_date, end_date, collapse, transform } = this.state
    const url = `${URL_BASE}${DATABASE_CODE}/${DATASET_CODE}.${DATA_FORMAT}?${URL_COLOMN}=${column}&${URL_START}=${start_date}&${URL_END}=${end_date}&${URL_COLLAPSE}=${collapse}&${URL_TRANSFORM}=${transform}&${URL_API}=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setResult(result));
      console.log(url);
  }

  setResult(result) {
    console.log(result);
  }

  render() {
    //const {  }
    return (
      <div>
        <CompanyButton 
          onClick={() => this.apiCall()}
        />
        <Graph />
        <Info />
      </div>
    );
  }
}

class CompanyButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        type="button"
        onClick={onClick}
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
