// @flow

const FETCH_SUCCESSFUL = "__FETCHER__FETCH_SUCCESSFUL";

// function is binded
export function fetchData(endpoint: string) {
  fetch(endpoint)
    .then(response => {
      let contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        throw new Error("REDUX FETCH HOC: Response is not a JSON!");
      }
    })
    .then(data => {
      this.props.dispatch({
        type: FETCH_SUCCESSFUL,
        endpoint,
        payload: data
      });
      this.setState(successState());
    })
    .catch(() => this.setState(errorState()));
}

function successState() {
  return {
    isLoading: false,
    isSuccess: true
  };
}

function errorState() {
  return {
    isSuccess: false,
    isLoading: false
  };
}

export let voidFunction = () => ({});
