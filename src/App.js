import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";

const json = require("../data/apiKey.json");

const URL_BASE = 'https://www.quandl.com/api/v3/datasets/';
const DATABASE_CODE = 'WIKI';
const DATA_FORMAT = 'json';
const URL_COLOMN = 'column_index';
const URL_START = 'start_date';
const URL_END = 'end_date';
const URL_COLLAPSE = 'collapse';
const URL_TRANSFORM = 'transform';
const URL_API = 'api_key';

const DEFAULT_COMPANY = 'GOOG';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null, //first column is date, second column is close
      apiKey: json.apiKey,
      column: '4',
      start_date: '2014-01-01',
      end_date: '2014-12-31',
      collapse: 'monthly',
      transform: 'none',
      dataset_code: DEFAULT_COMPANY,
    }

    this.apiCall = this.apiCall.bind(this);
    this.setResult = this.setResult.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall() {
    const { apiKey, column, start_date, end_date, collapse, transform, dataset_code } = this.state
    const url = `${URL_BASE}${DATABASE_CODE}/${dataset_code}.${DATA_FORMAT}?${URL_COLOMN}=${column}&${URL_START}=${start_date}&${URL_END}=${end_date}&${URL_COLLAPSE}=${collapse}&${URL_TRANSFORM}=${transform}&${URL_API}=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setResult(result));
  }

  setResult(result) {
    this.setState({
      data: result.dataset.data,
    });
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
        <CompanyButton 
          onClick={() => this.apiCall()}
        >
          Google
        </CompanyButton>
        <Graph 
          data={data}
        />
        <Info />
      </div>
    );
  }
}

class CompanyButton extends Component {
  render() {
    const { onClick, children } = this.props;
    return (
      <button
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

class Graph extends Component {
  render() {
    const { data } = this.props;

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
