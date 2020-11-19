import axios from 'axios';
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
  CLEAR_DAY_ERROR,
  CLEAR_DAY_SUCCESS,
} from '../constants/dayConstants';

export const getAllDays = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DAY_LIST_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {
      data: {
        data: { days },
      },
    } = await axios.get('/api/v1/days', config);

    dispatch({
      type: DAY_LIST_SUCCESS,
      payload: days,
    });
  } catch (error) {
    dispatch({
      type: DAY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDay = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DAY_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {
      data: {
        data: { day },
      },
    } = await axios.get(`/api/v1/days/${id}`, config);

    dispatch({
      type: DAY_SUCCESS,
      payload: day,
    });
  } catch (error) {
    dispatch({
      type: DAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDay = openHours => async (dispatch, getState) => {
  try {
    dispatch({ type: DAY_UPDATE_REQUEST });

    const {
      userAuth: { token },
      dayDetails: { day },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const {
      data: { data },
    } = await axios.patch(`/api/v1/days/${day._id}`, { openHours }, config);

    dispatch({
      type: DAY_UPDATE_SUCCESS,
      payload: { day: data.day, success: 'Day updated successfully' },
    });
  } catch (error) {
    dispatch({
      type: DAY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearDayError = () => dispatch => {
  dispatch({ type: CLEAR_DAY_ERROR });
};

export const clearDaySuccess = () => dispatch => {
  dispatch({ type: CLEAR_DAY_SUCCESS });
};
