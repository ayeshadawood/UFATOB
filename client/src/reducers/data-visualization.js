import {
  ALL_DV_DATA_LOADED_UNIVERSITY,
  DV_ERROR,
  ALL_DV_DATA_LOADED_YEAR,
  SET_DV_LOADING,
} from '../actions/types';

const initialState = {
  university: null,
  year: null,
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
    case ALL_DV_DATA_LOADED_YEAR:
      return {
        ...state,
        loading: false,
        errors: null,
        year: payload,
      };
    case DV_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case SET_DV_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
