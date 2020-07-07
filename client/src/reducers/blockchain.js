import {
  ALL_BLOCKCHAINS_LOADED,
  BLOCKCHAIN_ERROR,
  ALL_TRANSACTIONS_LOADED,
  ALL_TRANSACTIONS_LOADED_FOR_USER,
  TRANSACTION_CREATED,
  ALL_TRANSACTIONS_VERIFIED,
  BLOCKCHAIN_FIXED,
  SET_BLOCKCHAIN_LOADING,
} from '../actions/types';

const initialState = {
  transactions: [],
  userTransactions: [],
  blockchains: [],
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_BLOCKCHAINS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        blockchains: payload,
      };
    case ALL_TRANSACTIONS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        transactions: payload,
      };
    case ALL_TRANSACTIONS_LOADED_FOR_USER:
      return {
        ...state,
        loading: false,
        errors: null,
        userTransactions: payload,
      };
    case BLOCKCHAIN_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case SET_BLOCKCHAIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION_CREATED:
    case ALL_TRANSACTIONS_VERIFIED:
    case BLOCKCHAIN_FIXED:
    default:
      return state;
  }
}
