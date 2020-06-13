import axios from 'axios';
import { setAlert } from './alert';
import {
  ALL_COMPLAINTS_LOADED_FOR_USER,
  COMPLAINT_ERROR,
  COMPLAINT_LOADED,
  COMPLAINT_CREATED,
  ALL_COMPLAINTS_LOADED_FOR_UNIVERSITY,
  COMPLAINT_FORWARDED,
  COMPLAINT_CONSIDERED,
  COMPLAINT_NOT_CONSIDERED,
  ALL_COMPLAINTS_LOADED_FOR_HEC,
} from './types';

// Create complaint
export const createComplaint = (formData, history, university = '') => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  formData = { ...formData, university };

  try {
    const res = await axios.post('/api/complaints', formData, config);

    dispatch({
      type: COMPLAINT_CREATED,
      payload: res.data,
    });

    dispatch(setAlert('Complaint Created', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Get all complaints for user
export const getUserComplaints = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/complaints/user');

    dispatch({
      type: ALL_COMPLAINTS_LOADED_FOR_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all complaints for university
export const getUniversityComplaints = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/complaints/university');

    dispatch({
      type: ALL_COMPLAINTS_LOADED_FOR_UNIVERSITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all complaints for hec
export const getHecComplaints = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/complaints/hec');

    dispatch({
      type: ALL_COMPLAINTS_LOADED_FOR_HEC,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get complaint by id
export const getComplaint = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/complaints/${id}`);

    dispatch({
      type: COMPLAINT_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Forwared complaint to HEC
export const forwardComplaint = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/complaints/forward/${id}`);

    dispatch({
      type: COMPLAINT_FORWARDED,
      payload: res.data,
    });

    dispatch(setAlert('Complaint forwarded', 'success'));
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Consider a complaint
export const considerComplaint = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/complaints/consider/${id}`);

    dispatch({
      type: COMPLAINT_CONSIDERED,
      payload: res.data,
    });

    dispatch(setAlert('Complaint considered', 'success'));
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Not consider a complaint
export const notConsiderComplaint = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/complaints/not-consider/${id}`);

    dispatch({
      type: COMPLAINT_NOT_CONSIDERED,
      payload: res.data,
    });

    dispatch(setAlert('Complaint not considered', 'success'));
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
