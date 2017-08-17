// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import autobind from "class-autobind";

import { fetchData, voidFunction } from "./helpers";

type Props = {
  fetchedData: Object,
  dispatch: (action: Object) => void,
  data?: Object,
  state: Object
};

type State = {
  isLoading: boolean,
  isSuccess: ?boolean
};

export default (
  url: string,
  mapFromState: Function,
  mapFromProps: Function
) => (Instance: Object) => {
  class Fetcher extends Component {
    state: State;
    props: Props;
    _endpoint: ?string;

    constructor() {
      super(...arguments);
      this.state = {
        isLoading: true,
        isSuccess: null
      };
      autobind(this);
    }

    componentDidMount() {
      this._fetchData();
    }

    render() {
      let { ...rest } = this.props;
      let { isLoading, isSuccess } = this.state;
      let data = this._getFetchedData();
      return (
        <Instance
          {...rest}
          data={data}
          isLoading={isLoading}
          isSuccess={isSuccess}
          refetch={this._fetchData}
        />
      );
    }

    _fetchData() {
      fetchData.call(this, this._getEndpoint());
    }

    _getFetchedData() {
      let { state } = this.props;
      let currFetchedData = state.__FETCHER__[this._getEndpoint()];
      return this._combineFetchedData(currFetchedData);
    }

    _getEndpoint() {
      return this._endpoint || this._mapToEndpoint();
    }

    _mapToEndpoint() {
      let { state } = this.props;
      let mapping = { ...mapFromState(state), ...mapFromProps(this.props) };
      let endpoint = Object.keys(mapping).reduce((result, variable) => {
        return result.replace(variable, mapping[variable]);
      }, url);
      return endpoint;
    }

    _combineFetchedData(currFetchedData: Object) {
      let { data } = this.props;
      let prevFetchedData = data;
      if (prevFetchedData) {
        return Array.isArray(data)
          ? [currFetchedData, ...data]
          : [currFetchedData, data];
      }
      return currFetchedData;
    }
  }

  mapFromState = mapFromState || voidFunction;
  mapFromProps = mapFromProps || voidFunction;

  return connect(state => ({ state }))(Fetcher);
};
