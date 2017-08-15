"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (url, variableMapping) {
  return function (Instance) {
    var Fetcher = function (_Component) {
      _inherits(Fetcher, _Component);

      function Fetcher() {
        _classCallCheck(this, Fetcher);

        var _this = _possibleConstructorReturn(this, (Fetcher.__proto__ || Object.getPrototypeOf(Fetcher)).apply(this, arguments));

        _this.state = {
          isLoading: true,
          isSuccess: null
        };
        return _this;
      }

      _createClass(Fetcher, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          _helpers.fetchData.call(this);
        }
      }, {
        key: "render",
        value: function render() {
          var rest = _objectWithoutProperties(this.props, []);

          var _state = this.state,
              isLoading = _state.isLoading,
              isSuccess = _state.isSuccess;

          var data = this._combineFetchedData();
          return _react2.default.createElement(Instance, _extends({
            data: data,
            isLoading: isLoading,
            isSuccess: isSuccess
          }, rest));
        }
      }, {
        key: "_combineFetchedData",
        value: function _combineFetchedData() {
          var _props = this.props,
              fetchedData = _props.fetchedData,
              data = _props.data;

          if (data) {
            return Array.isArray(data) ? [fetchedData].concat(_toConsumableArray(data)) : [fetchedData, data];
          }
          return fetchedData;
        }
      }]);

      return Fetcher;
    }(_react.Component);

    function mapStateToProps(state) {
      var mapping = variableMapping(state);
      var endpoint = Object.keys(mapping).reduce(function (result, variable) {
        return result.replace(variable, mapping[variable]);
      }, url);
      return {
        endpoint: endpoint,
        fetchedData: state.__FETCH_DATA__[endpoint]
      };
    }

    return (0, _reactRedux.connect)(mapStateToProps)(Fetcher);
  };
};