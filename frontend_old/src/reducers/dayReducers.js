import {
  DAY_LIST_REQUEST,
  DAY_LIST_SUCCESS,
  DAY_LIST_FAIL,
  DAY_REQUEST,
  DAY_SUCCESS,
  DAY_FAIL,
  DAY_UPDATE_REQUEST,
  DAY_UPDATE_SUCCESS,
  DAY_UPDATE_FAIL,
  CLEAR_DAY_SUCCESS,
  CLEAR_DAY_ERROR,
} from '../constants/dayConstants';

export const dayReducer = (
  state = {
    days: [],
    day: null,
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case DAY_LIST_REQUEST:
      return {
        ...state,
        days: [],
        loading: true,
        error: null,
      };
    case DAY_LIST_SUCCESS:
      return {
        ...state,
        days: action.payload,
        loading: false,
        error: null,
      };
    case DAY_LIST_FAIL:
      return {
        ...state,
        days: [],
        loading: false,
        error: action.payload,
      };
    case DAY_REQUEST:
      return {
        ...state,
        day: null,
        loading: true,
        error: null,
      };
    case DAY_SUCCESS:
      return {
        ...state,
        day: action.payload,
        loading: false,
        error: null,
      };
    case DAY_FAIL:
      return {
        ...state,
        day: null,
        loading: false,
        error: action.payload,
      };
    case DAY_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case DAY_UPDATE_SUCCESS:
      return {
        ...state,
        day: action.payload.day,
        loading: false,
        error: null,
        success: action.payload.success,
      };
    case DAY_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };
    case CLEAR_DAY_SUCCESS:
      return {
        ...state,
        success: null,
      };
    case CLEAR_DAY_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
