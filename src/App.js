import React, { Component } from 'react';

import CompanyButton from './CompanyButton/CompanyButton';
import Graph from './Graph/Graph';
import Info from './Info/Info';

import * as d3 from "d3";

const json = require("../data/apiKey.json");
const companies = require("../data/Companies.json");

const URL_BASE = 'https://www.quandl.com/api/v3/datasets/';
const DATABASE_CODE = 'WIKI';
const DATA_FORMAT = 'json';
const URL_COLOMN = 'column_index';
const URL_START = 'start_date';
const URL_END = 'end_date';
const URL_COLLAPSE = 'collapse';
const URL_TRANSFORM = 'transform';
const URL_API = 'api_key';

const NAME_URL = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?';
const NAME_INPUT = 'input';
const NAME_CALLBACK = 'callback';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiKey: json.apiKey,
      column: '4',
      start_date: '2014-01-01',
      end_date: '2014-12-31',
      collapse: 'monthly',
      transform: 'none',
    }

    this.stockApiCall = this.stockApiCall.bind(this);
    this.setResult = this.setResult.bind(this);
    this.apiCalls = this.apiCalls.bind(this);
  }

  componentWillMount() {
    this.apiCalls();
  }

  cardApiCall(company) {
    const url = `${NAME_URL}${NAME_INPUT}=${company}&${NAME_CALLBACK}=lookup&origin=*`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(result => this.setCardResult(result));
  }

  setCardResult(result) {
    console.log(result);
    this.setState({

    });
  }

  stockApiCall(company) {
    const { apiKey, column, start_date, end_date, collapse, transform } = this.state
    const url = `${URL_BASE}${DATABASE_CODE}/${company}.${DATA_FORMAT}?${URL_COLOMN}=${column}&${URL_START}=${start_date}&${URL_END}=${end_date}&${URL_COLLAPSE}=${collapse}&${URL_TRANSFORM}=${transform}&${URL_API}=${apiKey}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(result => this.setResult(result));
  }

  apiCalls(company = 'GOOGL') {
    this.stockApiCall(company);
    //this.cardApiCall(company);
  }

  setData(date, close) {
    return {
      x: 'date',
      columns: [
        date,
        close
      ]
    }
  }

  setAxis() {
    return {
      x: {
        type: 'timeseries',
        label: {
          text: 'Time',
          position: 'outer-center'
        }
      },
      y: {
        label: {
          text: 'Close',
          position: 'outer-middle'
        }
      }
    }
  }

  setResult(result) {
    this.setState({
      data: this.formatDataset(result.dataset.data),
      axis: this.setAxis(),
    });
  }

  formatDataset(dataset) {
    const parseDate = d3.timeParse("%Y-%m-%d"); //.parse //ex - 2014-01-01

    const close = ["close"];
    const date = ["date"];

    dataset.forEach((d) => {
      date.push(parseDate(d[0]));
      close.push(d[1]);
    });

    return this.setData(date, close);
  }

  render() {
    const { data, axis } = this.state;
    return (
      <div>
        <CompanyButton
          onClick={() => this.apiCalls('FB')}
        >
          Facebook
        </CompanyButton>
        <CompanyButton
          onClick={() => this.apiCalls('GOOGL')}
        >
          Google
        </CompanyButton>
        <CompanyButton
          onClick={() => this.apiCalls('AMZN')}
        >
          Amazon
        </CompanyButton>
        <Graph
          data={data}
          axis={axis}
        />
        <Info />
      </div>
    );
  }
}

export default App;
