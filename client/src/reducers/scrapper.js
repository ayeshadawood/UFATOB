import { ALL_SCRAPPED_DATA_LOADED, SCRAPPED_ERROR } from '../actions/types';

const initialState = {
  scrappedData: null,
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_SCRAPPED_DATA_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        scrappedData: payload,
      };
    case SCRAPPED_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
