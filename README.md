# Fetch HOC Redux
Simple Fetching Higher Order Component with Redux integration. It will caches your fetch automatically.

## Installation
**NPM:**
```
npm install fetch-hoc-redux --save
```
**Yarn:**
```
yarn add fetch-hoc-redux
```
## Usage

Import `fetchHOCReducer` to your Redux setup:
```es6
import {createStore} from
import {fetchHOCReducer} from 'fetch-hoc-redux';

// specify here or in combineReducers
let reduxStore = createStore(fetchHOCReducer);
```

Wrap your component:
```es6
import fetchHOC from "fetch-hoc-redux";
import YourReactComponent from "./myComponent";

let URL = 'https://newsapi.org/v1/articles';

let WrapperComponent = fetchHOC(URL)(YourReactComponent);

```

You can also specify one to one variable mapping to set variable on the URL. It will receives state from your redux state.

```es6
import fetchHOC from "fetch-hoc-redux";
import YourReactComponent from "./myComponent";
import {API_KEY} from "./APIKey";

let URL =
  "https://newsapi.org/v1/articles?source=foo&apiKey=bar";

let variableMapper = (state) => {
  return {
    foo: state.source,
    bar: API_KEY,
  };
};

let WrapperComponent = fetchHOC(URL, variableMapper)(YourReactComponent);
```


For multiple endpoints, currently you can combine multiple fetch HOC Component:
```es6
import YourReactComponent from "./myComponent";
import {URL_1, URL_2} from "./URLs";

let WrapperComponent = fetchHOC(URL_1)(YourReactComponent);

export default fetchHOC(URL_2)(WrapperComponent)
```

## Passed Prop
| Prop    | Type            | Description                                                                |
| ------- | --------------- | -------------------------------------------------------------------------- |
| data    | Array or Object | Fetched data results, will be in array form if multiple endpoints are used |
| isLoading | boolean |
| isSuccess | boolean |
