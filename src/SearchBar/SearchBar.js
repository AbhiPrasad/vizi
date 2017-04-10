/*
import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      list: ['GOOG', 'FB'],
      loading: false,
    }
  }

  render() {
    return (
      <div> 
        <label htmlFor="company-autocomplete">Choose a company</label>
        <Autocomplete
          inputProps={{name: "Company", id:"company-autocomplete"}}
          ref="autocomplete"
          value={this.state.value}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            this.setState({ value, list: [ item ] })
          }}
          /*
          onChange={(event, value) => {
            this.setState({ value, loading: true })

          }}

        />
      </div>
    );
  }
}
*/