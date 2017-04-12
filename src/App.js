import React, { Component } from 'react';

import CompanyButton from './CompanyButton/CompanyButton';
import Graph from './Graph/Graph';
import Info from './Info/Info';
import SearchBar from './SearchBar/SearchBar';

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
      company_name: '',
      company_code: '',
      search_message: 'Choose a company'
    }

    this.stockApiCall = this.stockApiCall.bind(this);
    this.setResult = this.setResult.bind(this);
    this.apiCalls = this.apiCalls.bind(this);
    this.setCompanyName = this.setCompanyName.bind(this);
    this.getCompanyCode = this.getCompanyCode.bind(this);
  }

  componentWillMount() {
    this.apiCalls();
  }

  stockApiCall(company) {
    if (company === null) {
      this.setState({
        search_
      })
    } else {
      const { apiKey, column, start_date, end_date, collapse, transform } = this.state
      const url = `${URL_BASE}${DATABASE_CODE}/${company}.${DATA_FORMAT}?${URL_COLOMN}=${column}&${URL_START}=${start_date}&${URL_END}=${end_date}&${URL_COLLAPSE}=${collapse}&${URL_TRANSFORM}=${transform}&${URL_API}=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(result => this.setResult(result));
    }
  }

  apiCalls() {
    const company = this.getCompanyCode();
    this.stockApiCall(company);
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

  setCompanyName(name) {
    this.setState({
      company_name: name
    });
  }

  getCompanyCode() {
    const { company_name } = this.state;
    let company_code = '';
    for (let x in companies) {
      if (companies[x]['name'] === company_name) {
        company_code = companies[x]['code'];
      }
    }

    return company_code === '' ? null : company_code;
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
    const { data, axis, search_message } = this.state;
    return (
      <div>
        <SearchBar
          change={(item) => this.setCompanyName(item)}
        >
          {search_message}
        </SearchBar>
        <CompanyButton
          onClick={() => this.apiCalls()}
        >
          Go
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
