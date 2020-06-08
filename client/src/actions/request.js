import axios from 'axios';
import { setAlert } from './alert';
import { ALL_REQUESTS_LOADED_FOR_USER, REQUEST_ERROR } from './types';

// //Create fund request
// export const createRequest = (
//   formData,
//   history,
//   edit = false
// ) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     };
//     const res = await axios.post("/api/request", formData, config);

//     dispatch({
//       type: ADD_REQUEST,
//       payload: res.data
//     });
//     dispatch(setAlert("Request Dispatched", "success"));
//     if (!edit) {
//       history.push("/dashboard");
//     }
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: REQUEST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

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
