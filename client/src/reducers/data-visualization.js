import { ALL_DV_DATA_LOADED_UNIVERSITY, DV_ERROR } from '../actions/types';

const initialState = {
  university: null,
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_DV_DATA_LOADED_UNIVERSITY:
      return {
        ...state,
        loading: false,
        errors: null,
        university: payload,
      };
    case DV_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
