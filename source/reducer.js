// @flow
import { combineReducers } from "redux";

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

export let fetchRootReducer = combineReducers({
  __FETCHER__: fetchHOCReducer
});
