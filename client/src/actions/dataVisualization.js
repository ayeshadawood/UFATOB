import axios from 'axios';
import {
  ALL_DV_DATA_LOADED_UNIVERSITY,
  DV_ERROR,
  ALL_DV_DATA_LOADED_YEAR,
} from './types';

// Get data statistics by university
export const getDataStatisticsByUniversity = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/data-visualization/university');

    dispatch({
      type: ALL_DV_DATA_LOADED_UNIVERSITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DV_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get data statistics by year
export const getDataStatisticsByYear = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/data-visualization/year');

    dispatch({
      type: ALL_DV_DATA_LOADED_YEAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DV_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
