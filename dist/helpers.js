"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;
var ACTION_TYPE = "__FETCHER__FETCH_SUCCESSFUL";

// function is binded
function fetchData() {
  var _this = this;

  var endpoint = this.props.endpoint;

  fetch(endpoint).then(function (data) {
    _this.props.dispatch(action(data, endpoint));
    _this.setState(success());
  }).catch(function () {
    return _this.setState(error());
  });
}

function action(data, endpoint) {
  return {
    type: ACTION_TYPE,
    endpoint: endpoint,
    payload: JSON.parse(data._bodyInit || data)
  };
}

function success() {
  return {
    isLoading: false,
    isSucess: true
  };
}

function error() {
  return {
    isSuccess: false,
    isLoading: false
  };
}