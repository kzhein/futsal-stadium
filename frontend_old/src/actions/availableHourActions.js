import axios from 'axios';
import {
  AVAILABLE_HOUR_REQUEST,
  AVAILABLE_HOUR_SUCCESS,
  AVAILABLE_HOUR_FAIL,
  TOGGLE_SELECTED_HOUR,
  SET_AVAILABLE_HOUR_DATE,
} from '../constants/availableHourConstants';

export const getAvailableHours = date => async dispatch => {
  try {
    dispatch({ type: AVAILABLE_HOUR_REQUEST });

    const res = await axios.get('/api/v1/days/available', {
      headers: {
        'x-date': date,
      },
    });

    dispatch({
      type: AVAILABLE_HOUR_SUCCESS,
      payload: res.data.data.availableHours,
    });
  } catch (error) {
    dispatch({
      type: AVAILABLE_HOUR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleSelectedHour = id => dispatch => {
  dispatch({ type: TOGGLE_SELECTED_HOUR, payload: id });
};

export const setDate = date => dispatch => {
  dispatch({ type: SET_AVAILABLE_HOUR_DATE, payload: date });
};
