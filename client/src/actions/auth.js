import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  NAME_UPDATED,
  PASSWORD_UPDATED,
  PROFILE_PICTURE_UPLOADED,
  PROFILE_PICTURE_REMOVED,
  LOGOUT,
  CLEAR_PROFILE,
  AUTH_ERROR,
  ACCOUNT_ACTIVATED,
  ACCOUNT_DEACTIVATED,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { getAllUniversities } from './university';
import { getAllStudents } from './student';

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/me');

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = (formData, history, university = '') => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  formData = { ...formData, university };

  try {
    await axios.post('/api/users', formData, config);

    dispatch({ type: REGISTER_SUCCESS });

    if (formData.type === 1) {
      dispatch(setAlert('Student account created', 'success'));
    } else {
      dispatch(setAlert('Univeristy account created', 'success'));
    }

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAILED,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
      },
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    } else {
      dispatch(setAlert(err.response.data.msg, 'error'));
    }

    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

// Change password
export const changePassword = (password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ password });

    await axios.put('/api/users/password', body, config);

    dispatch({ type: PASSWORD_UPDATED });

    dispatch(setAlert('Password updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Change name
export const changeName = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/users/name', formData, config);

    dispatch({
      type: NAME_UPDATED,
      payload: res.data.name,
    });

    dispatch(setAlert('Name updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Upload profile picture
export const uploadProfilePicture = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      '/api/users/profile-picture/upload',
      formData,
      config
    );

    dispatch({
      type: PROFILE_PICTURE_UPLOADED,
      payload: res.data.avatar,
    });

    dispatch(setAlert('Profile picture uploaded', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Remove profile picture
export const removeProfilePicture = () => async (dispatch) => {
  try {
    const res = await axios.put('/api/users/profile-picture/remove');

    dispatch({
      type: PROFILE_PICTURE_REMOVED,
      payload: res.data.avatar,
    });

    dispatch(setAlert('Profile picture removed', 'success'));
  } catch (err) {
    dispatch(setAlert('Profile picture already removed', 'error'));
  }
};

// Activate an account
export const activateAccount = (id, type) => async (dispatch) => {
  try {
    await axios.put(`/api/users/activate/${id}`);

    dispatch({ type: ACCOUNT_ACTIVATED });

    dispatch(setAlert('Account activated', 'success'));

    if (type === 1) {
      dispatch(getAllUniversities());
    } else {
      dispatch(getAllStudents());
    }
  } catch (err) {
    dispatch(setAlert('Error occurred', 'error'));
  }
};

// Deactivate an account
export const deactivateAccount = (id, type) => async (dispatch) => {
  try {
    await axios.put(`/api/users/deactivate/${id}`);

    dispatch({ type: ACCOUNT_DEACTIVATED });

    dispatch(setAlert('Account deactivated', 'success'));

    if (type === 1) {
      dispatch(getAllUniversities());
    } else {
      dispatch(getAllStudents());
    }
  } catch (err) {
    dispatch(setAlert('Error occurred', 'error'));
  }
};

// Deactivate an account for user
export const deactivateAccountForUser = (id) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure? You will need to contact admin for reactivation.'
    )
  ) {
    try {
      await axios.put(`/api/users/deactivate/${id}`);

      dispatch({ type: ACCOUNT_DEACTIVATED });

      dispatch(setAlert('Account deactivated', 'success'));

      dispatch(logout());
    } catch (err) {
      dispatch(setAlert('Error occurred', 'error'));
    }
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
