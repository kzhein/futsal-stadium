import {
  AVAILABLE_HOUR_REQUEST,
  AVAILABLE_HOUR_SUCCESS,
  AVAILABLE_HOUR_FAIL,
  TOGGLE_SELECTED_HOUR,
  SET_AVAILABLE_HOUR_DATE,
} from '../constants/availableHourConstants';

export const availableHourReducer = (
  state = {
    loading: false,
    date: null,
    availableHours: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case AVAILABLE_HOUR_REQUEST:
      return {
        ...state,
        loading: true,
        availableHours: [],
      };
    case AVAILABLE_HOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        availableHours: action.payload,
      };
    case AVAILABLE_HOUR_FAIL:
      return {
        ...state,
        loading: false,
        availableHours: [],
        error: action.payload,
      };
    case TOGGLE_SELECTED_HOUR:
      return {
        ...state,
        availableHours: state.availableHours.map(ava => {
          if (ava._id === action.payload) {
            ava.selected = !ava.selected;
          }
          return ava;
        }),
      };
    case SET_AVAILABLE_HOUR_DATE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};
