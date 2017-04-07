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

const DEFAULT_COMPANY = 'GOOG';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: EXAMPLE_DATA, //first column is date, second column is close
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
      dataset: result.dataset.data,
    });
  }

  render() {
    const { dataset } = this.state;
    return (
      <div>
        <CompanyButton
          onClick={() => this.apiCall()}
        >
          Google
        </CompanyButton>
        <Graph
          dataset={dataset}
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

const Graph = ({ dataset }) => {
  const margin = { top: 30, right: 20, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 270 - margin.top - margin.bottom;

  const parseDate = d3.timeParse("%Y-%m-%d"); //.parse //ex - 2014-01-01
  const formatDate = d3.timeFormat("%d-%b-%y");

  const x = d3.scaleTime()
    .rangeRound([0, width]);
  
  const y = d3.scaleLinear()
    .rangeRound([height, 0]);

  const data = dataset.map(function (d) {
    return {
      date: formatDate(parseDate(d[0])),
      close: d[1]
    }
  });

  const line = d3.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.close)
    });

  const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.close = +d.close;
  });   
  
  x.domain(d3.extent(data, function(d) {
    return d.date;
  }));
  y.domain([0, d3.max(data, function(d) {
    return d.close;
  })]);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

  return (
    <div className="graph" > GRAPH </div>
  );
}

class Info extends Component {
  render() {
    return (
      <div> INFO </div>
    );
  }
}

export default App;
