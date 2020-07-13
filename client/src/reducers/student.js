import {
  ALL_STUDENTS_LOADED,
  STUDENT_ERROR,
  STUDENT_REMOVED,
  SET_STUDENT_LOADING,
} from '../actions/types';

const initialState = {
  students: [],
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_STUDENTS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        students: payload,
      };
    case STUDENT_REMOVED:
      return {
        ...state,
        loading: false,
        errors: null,
        students: [
          ...state.students.filter((student) => student._id !== payload),
        ],
      };
    case STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case SET_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
