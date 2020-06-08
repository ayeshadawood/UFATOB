import { SET_ALERT, HIDE_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  showAlerts: false,
  alerts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        showAlerts: true,
        alerts: [...state.alerts, payload],
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlerts: false,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: [...state.alerts.filter((alert) => alert.id !== payload)],
      };
    default:
      return state;
  }
}
