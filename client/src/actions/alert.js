import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, HIDE_ALERT, REMOVE_ALERT } from './types';

let hideAlert = true;

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType },
  });

  hideAlert = false;

  setTimeout(() => {
    if (!hideAlert) {
      dispatch({ type: HIDE_ALERT });
      hideAlert = true;
    }
  }, timeout);

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, timeout + 100);
};
