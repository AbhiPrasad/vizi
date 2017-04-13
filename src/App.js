import React, { Component } from 'react';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import Graph from './Graph/Graph';
import Info from './Info/Info';
import SearchBar from './SearchBar/SearchBar';
import CollapseButton from './CollapseButton/CollapseButton';

import * as d3 from "d3";
import DatePicker from "react-datepicker";

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

const COLLAPSE_LIST = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annual'];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiKey: json.apiKey,
      column: '4',
      start_date: moment('2012-01-01'),
      end_date: moment(),
      collapse: 'monthly',
      transform: 'none',
      company_name: 'Apple Inc.',
      company_code: '',
      search_message: 'Choose a company'
    }

    this.stockApiCall = this.stockApiCall.bind(this);
    this.setResult = this.setResult.bind(this);
    this.apiCalls = this.apiCalls.bind(this);
    this.setCompanyName = this.setCompanyName.bind(this);
    this.getCompanyCode = this.getCompanyCode.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.setCollapse = this.setCollapse.bind(this);
  }

  componentWillMount() {
    this.apiCalls();
  }

  stockApiCall(company) {
    if (company === null) {
      this.setState({
        search_message: "Error"
      });
    } else {
      this.setState({
        search_message: "Choose a company"
      });
      const { apiKey, column, start_date, end_date, collapse, transform } = this.state
      const start = start_date.format('LLLL');
      const end = end_date.format('LLLL');
      const url = `${URL_BASE}${DATABASE_CODE}/${company}.${DATA_FORMAT}?${URL_COLOMN}=${column}&${URL_START}=${start}&${URL_END}=${end}&${URL_COLLAPSE}=${collapse}&${URL_TRANSFORM}=${transform}&${URL_API}=${apiKey}`;
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

  handleChangeStart(date) {
    this.setState({
      start_date: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      end_date: date
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

  setCollapse(event) {
    this.setState({
      collapse: event.currentTarget.textContent.toLowerCase()
    });
    this.apiCalls();
  }

  render() {
    const { data, axis, search_message, start_date, end_date } = this.state;
    return (
      <div>
        <SearchBar
          change={(item) => this.setCompanyName(item)}
        >
          {search_message}
        </SearchBar>
        <div>
          <DatePicker
            selected={start_date}
            selectsStart startDate={start_date}
            endDate={end_date}
            onChange={this.handleChangeStart}
          />
          <DatePicker
            selected={end_date}
            selectsEnd startDate={start_date}
            endDate={end_date}
            onChange={this.handleChangeEnd}
          />
        </div>
        {COLLAPSE_LIST.map(item => {
          return (
            <CollapseButton onClick={(evt) => this.setCollapse(evt)}>
              {item}
            </CollapseButton>
          );
        })
        }
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
