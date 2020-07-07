import axios from 'axios';
import {
  ALL_GROUPS_LOADED,
  GROUP_LOADED,
  GROUP_CREATED,
  GROUP_UPDATED,
  GROUP_DELETED,
  GROUP_ERROR,
  SET_GROUP_LOADING,
} from './types';
import { setAlert } from './alert';

// Get all groups
export const getAllGroups = () => async (dispatch) => {
  dispatch({
    type: SET_GROUP_LOADING,
  });

  try {
    const res = await axios.get('/api/groups');

    dispatch({
      type: ALL_GROUPS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get group by id
export const getGroupById = (id) => async (dispatch) => {
  dispatch({
    type: SET_GROUP_LOADING,
  });

  try {
    const res = await axios.get(`/api/groups/${id}`);

    dispatch({
      type: GROUP_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create a new group
export const createGroup = (formData, history) => async (dispatch) => {
  dispatch({
    type: SET_GROUP_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/groups', formData, config);

    dispatch({
      type: GROUP_CREATED,
      payload: res.data,
    });

    dispatch(setAlert('Group created', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update a group
export const updateGroup = (formData, id, history) => async (dispatch) => {
  dispatch({
    type: SET_GROUP_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/groups/${id}`, formData, config);

    dispatch({
      type: GROUP_UPDATED,
      payload: res.data,
    });

    dispatch(setAlert('Group updated', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;

    if (err.response.data.errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a group
export const deleteGroup = (id) => async (dispatch) => {
  dispatch({
    type: SET_GROUP_LOADING,
  });

  try {
    await axios.delete(`/api/groups/${id}`);

    dispatch({
      type: GROUP_DELETED,
      payload: id,
    });

    dispatch(setAlert('Group removed', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Search for a group
export const searchGroup = (description) => async (dispatch) => {
  dispatch({
    type: SET_GROUP_LOADING,
  });

  try {
    const res = await axios.get(`/api/groups/search/${description}`);

    dispatch({
      type: ALL_GROUPS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
