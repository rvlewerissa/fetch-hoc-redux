// @flow

const ACTION_TYPE = "__FETCHER__FETCH_SUCCESSFUL";

// function is binded
export function fetchData() {
  let { endpoint } = this.props;
  fetch(endpoint)
    .then(data => {
      this.props.dispatch(action(data, endpoint));
      this.setState(success());
    })
    .catch(() => this.setState(error()));
}

function action(data, endpoint) {
  return {
    type: ACTION_TYPE,
    endpoint,
    // $FlowFixMe
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
