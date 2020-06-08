import { ALL_REQUESTS_LOADED_FOR_USER, REQUEST_ERROR } from '../actions/types';

const initialState = {
  request: null,
  requests: [],
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_REQUESTS_LOADED_FOR_USER:
      return {
        ...state,
        loading: false,
        errors: null,
        requests: payload,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
