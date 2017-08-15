"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchHOCReducer = undefined;

var _reducer = require("./reducer");

Object.defineProperty(exports, "fetchHOCReducer", {
  enumerable: true,
  get: function get() {
    return _reducer.reducer;
  }
});

var _fetchHOC = require("./fetchHOC");

var _fetchHOC2 = _interopRequireDefault(_fetchHOC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _fetchHOC2.default;