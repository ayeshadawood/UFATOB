import axios from 'axios';
import { ALL_DV_DATA_LOADED_UNIVERSITY, DV_ERROR } from './types';

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
