import {
  ALL_REQUESTS_LOADED_FOR_USER,
  REQUEST_ERROR,
  REQUEST_LOADED,
  REQUEST_CREATED,
  ALL_REQUESTS_LOADED_FOR_UNIVERSITY,
  REQUEST_FORWARDED,
  ALL_REQUESTS_LOADED_FOR_HEC,
  REQUEST_ACCEPTED,
  REQUEST_REJECTED,
} from '../actions/types';

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
    case ALL_REQUESTS_LOADED_FOR_UNIVERSITY:
    case ALL_REQUESTS_LOADED_FOR_HEC:
      return {
        ...state,
        loading: false,
        errors: null,
        requests: payload,
      };
    case REQUEST_FORWARDED:
    case REQUEST_ACCEPTED:
    case REQUEST_REJECTED:
      return {
        ...state,
        loading: false,
        errors: null,
        requests: [
          ...state.requests.map((request) => {
            if (request._id === payload._id) {
              request.status = payload.status;
            }
            return request;
          }),
        ],
      };
    case REQUEST_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        request: payload,
      };
    case REQUEST_CREATED:
      return {
        ...state,
        loading: false,
        errors: null,
        requests: [...state.requests, payload],
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
