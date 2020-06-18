import axios from 'axios';
import { ALL_SCRAPPED_DATA_LOADED, SCRAPPED_ERROR } from './types';

// Get all scrapped data from HEC
export const getAllScrappedData = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/scrapper');

    dispatch({
      type: ALL_SCRAPPED_DATA_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SCRAPPED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
