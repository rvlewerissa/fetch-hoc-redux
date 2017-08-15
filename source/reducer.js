// @flow

export function fetchHOCReducer(state: Object = {}, action: Object) {
  switch (action.type) {
    case "__FETCHER__FETCH_SUCCESSFUL": {
      return {
        ...state,
        [action.endpoint]: action.payload
      };
    }
    default:
      return state;
  }
}
