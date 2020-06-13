import axios from 'axios';
import { setAlert } from './alert';
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
} from './types';

//Create fund request
export const createRequest = (formData, history, institute = '') => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  formData = { ...formData, institute };

  try {
    const res = await axios.post('/api/requests', formData, config);

    dispatch({
      type: REQUEST_CREATED,
      payload: res.data,
    });

    dispatch(setAlert('Request Created', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get all requests for user
export const getUserRequests = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/requests/user');

    dispatch({
      type: ALL_REQUESTS_LOADED_FOR_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all requests for hec
export const getHecRequests = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/requests/hec');

    dispatch({
      type: ALL_REQUESTS_LOADED_FOR_HEC,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all requests for university
export const getUniversityRequests = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/requests/university');

    dispatch({
      type: ALL_REQUESTS_LOADED_FOR_UNIVERSITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get request by id
export const getRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/requests/${id}`);

    dispatch({
      type: REQUEST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Forwared request to HEC
export const forwardRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/requests/forward/${id}`);

    dispatch({
      type: REQUEST_FORWARDED,
      payload: res.data,
    });

    dispatch(setAlert('Request forwarded', 'success'));
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Accept a request
export const acceptRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/requests/accept/${id}`);

    dispatch({
      type: REQUEST_ACCEPTED,
      payload: res.data,
    });

    dispatch(setAlert('Request accepted', 'success'));
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Reject a request
export const rejectRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/requests/reject/${id}`);

    dispatch({
      type: REQUEST_REJECTED,
      payload: res.data,
    });

    dispatch(setAlert('Request rejected', 'success'));
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
