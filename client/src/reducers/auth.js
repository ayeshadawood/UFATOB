import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  USER_DELETED,
  PASSWORD_UPDATED,
  NAME_UPDATED,
  PROFILE_PICTURE_UPLOADED,
  PROFILE_PICTURE_REMOVED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case LOGOUT:
    case USER_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case PROFILE_PICTURE_UPLOADED:
    case PROFILE_PICTURE_REMOVED:
      return {
        ...state,
        loading: false,
        user: { ...state.user, avatar: payload },
      };
    case NAME_UPDATED:
      return {
        ...state,
        loading: false,
        user: { ...state.user, name: payload },
      };
    case PASSWORD_UPDATED:
    case REGISTER_SUCCESS:
    default:
      return state;
  }
}
