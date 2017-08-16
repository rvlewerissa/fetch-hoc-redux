// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "./helpers";

type Props = {
  endpoint: string,
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

    constructor() {
      super(...arguments);
      this.state = {
        isLoading: true,
        isSuccess: null
      };
    }

    componentDidMount() {
      let { endpoint } = this.props;
      fetchData.call(this, endpoint);
    }

    render() {
      let { ...rest } = this.props;
      let { isLoading, isSuccess } = this.state;
      let data = this._combineFetchedData();
      return (
        <Instance
          data={data}
          isLoading={isLoading}
          isSuccess={isSuccess}
          {...rest}
        />
      );
    }

    _getFetchedData() {
      let { state } = this.props;
      return state.__FETCHER__[this._getEndpoint()];
    }

    _getEndpoint() {
      return this._mapToEndpoint();
    }

    _mapToEndpoint() {
      let { state } = this.props;
      let mapping = { ...mapFromState(state), ...mapFromProps(this.props) };
      let endpoint = Object.keys(mapping).reduce((result, variable) => {
        return result.replace(variable, mapping[variable]);
      }, url);
      return endpoint;
    }

    _combineFetchedData() {
      let { data } = this.props;
      let fetchedData = this._getFetchedData();
      if (data) {
        return Array.isArray(data)
          ? [fetchedData, ...data]
          : [fetchedData, data];
      }
      return fetchedData;
    }
  }

  return connect(state => ({ state }))(Fetcher);
};
