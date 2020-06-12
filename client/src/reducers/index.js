import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import request from './request';
import university from './university';

export default combineReducers({
  alert,
  auth,
  profile,
  request,
  university,
});
