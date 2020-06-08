import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import request from './request';

export default combineReducers({
  alert,
  auth,
  profile,
  request,
});
