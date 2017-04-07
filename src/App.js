import React, { Component } from 'react';
import './App.css';
import '../bower_components/c3/c3.min.css';

import * as d3 from "d3";
import * as c3 from "c3";

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

const EXAMPLE_DATA = [
  [
    "2014-12-31",
    0.004118404118404
  ],
  [
    "2014-11-30",
    0.036138151753567
  ],
  [
    "2014-10-31",
    -0.05123987854251
  ],
  [
    "2014-09-30",
    0.056402031542369
  ],
  [
    "2014-08-31",
    0.029869236063317
  ],
  [
    "2014-07-31",
    0.07965522365879
  ],
  [
    "2014-06-30",
    0.06303317535545
  ],
  [
    "2014-05-31",
    0.058882569421211
  ],
  [
    "2014-04-30",
    -0.0076361221779549
  ],
  [
    "2014-03-31",
    -0.12007011393514
  ],
  [
    "2014-02-28",
    0.094134569282404
  ]
];

const DEFAULT_COMPANY = 'FB';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null, //first column is date, second column is close
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

  componentWillMount() {
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
    console.log(result);
    this.setState({
      result: this.formatDataset(result.dataset.data),
    });
  }

  formatDataset(dataset) {
    const parseDate = d3.timeParse("%Y-%m-%d"); //.parse //ex - 2014-01-01
    const formatDate = d3.timeFormat("%Y%m%d");

    const close = ["close"];
    const date = ["date"];

    dataset.forEach((d) => {
      date.push(parseDate(d[0]));
      close.push(d[1]);
    });

    return { close, date };
  }

  render() {
    const { result } = this.state;
    return (
      <div>
        <CompanyButton
          onClick={() => this.apiCall()}
        >
          Facebook
        </CompanyButton>
        <Graph
          result={result}
        />
        <Info />
      </div>
    );
  }
}

const CompanyButton = ({ onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

class Graph extends Component {

  constructor(props) {
    super(props)

    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    const { result } = this.props;
    if (result !== null) {
      const chart = c3.generate({
        bindto: '#graph',
        data: {
          x: 'date',
          columns: [
            result.date,
            result.close
          ]
        },
        axis: {
          x: {
            type: 'timeseries'
          }
        }
      });
    }
  }
// http://stackoverflow.com/questions/30018487/updating-c3-charts-on-props-change-with-react
// Gotta fix
  render() {
    console.log(this.props.result);
    return (
      <div id="graph"></div>
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
