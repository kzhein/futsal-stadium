import axios, { AxiosResponse } from 'axios';
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
import { AppThunk } from '../types/utils';
import { DayDispatchTypes } from '../types/day/dayActionTypes';
import { Day } from '../types/day/day';

export const getAllDays = (): AppThunk<DayDispatchTypes> => async (
  dispatch,
  getState
) => {
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

    interface response {
      data: {
        days: Day[];
      };
    }

    const {
      data: {
        data: { days },
      },
    }: AxiosResponse<response> = await axios.get('/api/v1/days', config);

    dispatch({
      type: DAY_LIST_SUCCESS,
      payload: days,
    });
  } catch (error) {
    dispatch({
      type: DAY_LIST_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: CLEAR_DAY_ERROR });
  }
};

export const getDay = (id: string): AppThunk<DayDispatchTypes> => async (
  dispatch,
  getState
) => {
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

    interface response {
      data: {
        day: Day;
      };
    }

    const {
      data: {
        data: { day },
      },
    }: AxiosResponse<response> = await axios.get(`/api/v1/days/${id}`, config);

    dispatch({
      type: DAY_SUCCESS,
      payload: day,
    });
  } catch (error) {
    dispatch({
      type: DAY_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: CLEAR_DAY_ERROR });
  }
};

export const updateDay = (
  openHours: string[]
): AppThunk<DayDispatchTypes> => async (dispatch, getState) => {
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

    interface response {
      data: {
        day: Day;
      };
    }

    const {
      data: { data },
    }: AxiosResponse<response> = await axios.patch(
      `/api/v1/days/${day!._id}`,
      { openHours },
      config
    );

    dispatch({
      type: DAY_UPDATE_SUCCESS,
      payload: { day: data.day, success: 'Day updated successfully' },
    });
    dispatch({ type: CLEAR_DAY_SUCCESS });
  } catch (error) {
    dispatch({
      type: DAY_UPDATE_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: CLEAR_DAY_ERROR });
  }
};
