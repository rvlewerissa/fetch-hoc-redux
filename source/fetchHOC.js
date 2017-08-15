// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "./helpers";

type Props = {
  endpoint: string,
  fetchedData: Object,
  dispatch: (action: Object) => void,
  data?: Object
};

type State = {
  isLoading: boolean,
  isSuccess: ?boolean
};

export default (url: string, variableMapping: Function) => (
  Instance: Object
) => {
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
      fetchData.call(this);
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

    _combineFetchedData() {
      let { fetchedData, data } = this.props;
      if (data) {
        return Array.isArray(data)
          ? [fetchedData, ...data]
          : [fetchedData, data];
      }
      return fetchedData;
    }
  }

  function mapStateToProps(state) {
    let mapping = variableMapping(state);
    let endpoint = Object.keys(mapping).reduce((result, variable) => {
      return result.replace(variable, mapping[variable]);
    }, url);
    return {
      endpoint,
      fetchedData: state.__FETCH_DATA__[endpoint]
    };
  }

  return connect(mapStateToProps)(Fetcher);
};
