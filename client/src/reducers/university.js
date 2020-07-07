import {
  ALL_UNIVERSITIES_LOADED,
  UNIVERSITY_ERROR,
  UNIVERSITY_REMOVED,
  SET_UNIVERSTITY_LOADING,
} from '../actions/types';

const initialState = {
  universities: [],
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_UNIVERSITIES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        universities: payload,
      };
    case UNIVERSITY_REMOVED:
      return {
        ...state,
        loading: false,
        errors: null,
        universities: [
          ...state.universities.filter(
            (university) => university._id !== payload
          ),
        ],
      };
    case UNIVERSITY_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case SET_UNIVERSTITY_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
