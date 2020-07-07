import {
  PROFILE_LOADED,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  EXPERIENCE_ADDED,
  EDUCATION_ADDED,
  EXPERIENCE_REMOVED,
  EDUCATION_REMOVED,
  PROFILE_DELETED,
  ALL_PROFILES_LOADED,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  errors: null,
  profiles: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_PROFILES_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        profiles: payload,
      };
    case PROFILE_LOADED:
    case EXPERIENCE_ADDED:
    case EDUCATION_ADDED:
    case EXPERIENCE_REMOVED:
    case EDUCATION_REMOVED:
      return {
        ...state,
        profile: payload,
        loading: false,
        errors: null,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: payload,
      };
    case CLEAR_PROFILE:
    case PROFILE_DELETED:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
}
