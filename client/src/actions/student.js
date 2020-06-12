import axios from 'axios';
import { ALL_STUDENTS_LOADED, STUDENT_ERROR, STUDENT_REMOVED } from './types';
import { setAlert } from './alert';

// Get all universities
export const getAllStudents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/student');

    dispatch({
      type: ALL_STUDENTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STUDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a university
export const deleteStudent = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/student/${id}`);

    dispatch({
      type: STUDENT_REMOVED,
      payload: id,
    });

    dispatch(setAlert('Student removed', 'success'));
  } catch (err) {
    dispatch({
      type: STUDENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
