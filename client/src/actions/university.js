import axios from 'axios';
import {
  ALL_UNIVERSITIES_LOADED,
  UNIVERSITY_ERROR,
  UNIVERSITY_REMOVED,
} from './types';
import { setAlert } from './alert';

// Get all universities
export const getAllUniversities = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/university');

    dispatch({
      type: ALL_UNIVERSITIES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UNIVERSITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a university
export const deleteUniversity = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/university/${id}`);

    dispatch({
      type: UNIVERSITY_REMOVED,
      payload: id,
    });

    dispatch(setAlert('University removed', 'success'));
  } catch (err) {
    dispatch({
      type: UNIVERSITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
