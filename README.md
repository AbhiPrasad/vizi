# Vizi

> A finance app built with React and uses Quandl finance api

![Picture of viewer](./Demo.png?raw=true "Picture")

## Dev

```
$ npm install
```

### Run

```
$ npm start
```

Also you have to add an ApiKey.json file to the data folder and add a valid api key (Uses Quandl API), format:

```javascript
{
    "apiKey" : "INSERT_API_KEY_HERE"
}
```

## Using

### Main

* React 
* [Quandl Finance API](https://www.quandl.com/)
* Webpack to package js and css and babel to transpile js and jsx
* [d3js](https://d3js.org/) for data visualization, [c3js](http://c3js.org/) to create nice looking charts
* [MomentJS](https://momentjs.com/) because dates suck to work with

### React Components

* [React-Autosuggest](http://react-autosuggest.js.org/) for the autosuggester
* [React-DatePicker](https://hacker0x01.github.io/react-datepicker/) for the datepickers
* [Reactstrap](https://reactstrap.github.io/) for use Bootstrap React Components
* [React-Fontawesome](https://www.npmjs.com/package/react-fontawesome) because its cool

## License

MIT © Abhijeet Prasad
