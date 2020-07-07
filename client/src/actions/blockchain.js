import axios from 'axios';
import {
  ALL_BLOCKCHAINS_LOADED,
  BLOCKCHAIN_ERROR,
  ALL_TRANSACTIONS_LOADED,
  ALL_TRANSACTIONS_LOADED_FOR_USER,
  TRANSACTION_CREATED,
  ALL_TRANSACTIONS_VERIFIED,
  BLOCKCHAIN_FIXED,
  SET_BLOCKCHAIN_LOADING,
} from './types';
import { setAlert } from './alert';

// Get all the blockhains
export const getAllBlockchains = () => async (dispatch) => {
  dispatch({
    type: SET_BLOCKCHAIN_LOADING,
  });

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
  dispatch({
    type: SET_BLOCKCHAIN_LOADING,
  });

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

// Get all the transactions for user
export const getAllTransactionsForUser = () => async (dispatch) => {
  dispatch({
    type: SET_BLOCKCHAIN_LOADING,
  });

  try {
    const res = await axios.get('/api/blockchain/my-transactions');

    dispatch({
      type: ALL_TRANSACTIONS_LOADED_FOR_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the transactions for user
export const createTransaction = (formData, history) => async (dispatch) => {
  dispatch({
    type: SET_BLOCKCHAIN_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/blockchain/transaction', formData, config);

    dispatch({ type: TRANSACTION_CREATED });

    dispatch(setAlert('Transaction created', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;

    errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
  }
};

// Verfiy all transactions
export const verfiyAllTransactions = () => async (dispatch) => {
  dispatch({
    type: SET_BLOCKCHAIN_LOADING,
  });

  try {
    await axios.put('/api/blockchain/mine');

    dispatch({ type: ALL_TRANSACTIONS_VERIFIED });

    dispatch(setAlert('All transactions verified', 'success'));

    dispatch(getAllTransactionsForUser());
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Fix a blockchain
export const fixBlockchain = (id) => async (dispatch) => {
  dispatch({
    type: SET_BLOCKCHAIN_LOADING,
  });

  try {
    await axios.put(`/api/blockchain/consensus/${id}`);

    dispatch({ type: BLOCKCHAIN_FIXED });

    dispatch(setAlert('Blockchain fixed', 'success'));

    dispatch(getAllBlockchains());
  } catch (err) {
    dispatch({
      type: BLOCKCHAIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
