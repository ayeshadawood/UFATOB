import axios from 'axios';
import {
  ALL_BLOCKCHAINS_LOADED,
  BLOCKCHAIN_ERROR,
  ALL_TRANSACTIONS_LOADED,
} from './types';

// Get all the blockhains
export const getAllBlockchains = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blockchain');

    dispatch({
      type: ALL_BLOCKCHAINS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the transactions for a blockchain
export const getAllTransactions = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/blockchain/transactions/${id}`);

    dispatch({
      type: ALL_TRANSACTIONS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
