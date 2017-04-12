import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './SearchBar.css';

const companies = require("../../data/Companies.json");

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const changeLength = item => {
    item.length = 10;
    return item;
  }

  const returnItem = inputLength === 0 ? [] : companies.filter(code =>
    code.name.toLowerCase().slice(0, inputLength) === inputValue
  );

  return returnItem >= 10 ? returnItem : changeLength(returnItem);
};

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = suggestion => (
  <span className="hello">
    {suggestion.name}
  </span>
);

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    }
  }

  onChange = (event, { newValue }) => {
    const { change } = this.props;
    change(newValue);
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this functiona every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const { children } = this.props;

    const inputProps = {
      placeholder: 'Company',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <label>{children}</label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default SearchBar;