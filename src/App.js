import React, { Component } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import Header from './Header/Header';
import Graph from './Graph/Graph';
import CollapseButton from './Settings/CollapseButton/CollapseButton';
import Calendar from './Settings/Calendar/Calendar';
import RadioButtons from './Settings/RadioButtons/RadioButtons';

import * as d3 from "d3";
import moment from 'moment';
import { Container } from 'reactstrap';

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
      start_date: moment('2012-01-01'),
      end_date: moment(),
      collapse: 'monthly',
      transform: 'none',
      company_name: 'Apple Inc.',
      company_code: '',
      search_message: 'Choose a company',
      isLoading: false,
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
    this.setState({
      isLoading: true
    })
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
      isLoading: false,
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

  setCollapse(newCollapse) {
    this.setState({
      collapse: newCollapse.toLowerCase(),
    });
  }

  render() {
    const { data, axis, start_date, end_date, isLoading } = this.state;
    return (
      <Container fluid>
        <Header
          setCompanyName={(item) => this.setCompanyName(item)}
        />
        <Calendar
          start_date={start_date}
          end_date={end_date}
          handleChangeStart={this.handleChangeStart}
          handleChangeEnd={this.handleChangeEnd}
        />
        <RadioButtons
          setCollapse={(newCollapse) => this.setCollapse(newCollapse)}
        />
        <CollapseButton
          onClick={() => this.apiCalls()}
          isLoading={isLoading}
        >
          View
        </CollapseButton>
        <Graph
          data={data}
          axis={axis}
        />
      </Container>
    );
  }
}

export default App;
