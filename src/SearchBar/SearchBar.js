import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

const companies = require("../../data/ex2.json");

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      list: ['GOOG', 'FB'],
      loading: false,
    }
  }

  getCompanies () {
    console.log(companies);
  }

  render() {
    return (
      <div> 
        <label htmlFor="company-autocomplete">Choose a company</label>
      </div>
    );
  }
}

export default SearchBar;