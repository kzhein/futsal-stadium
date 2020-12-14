import axios, { AxiosResponse } from 'axios';
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_STATUS_RESET,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAIL,
  BOOKING_ALL_REQUEST,
  BOOKING_ALL_SUCCESS,
  BOOKING_ALL_FAIL,
  BOOKING_APPROVE_REQUEST,
  BOOKING_APPROVE_SUCCESS,
  BOOKING_APPROVE_FAIL,
  BOOKING_APPROVE_RESET,
  BOOKING_ALL_RESET,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DELETE_RESET,
  USER_BOOKINGS_RESET,
} from '../constants/bookingConstants';
import { USER_LOGOUT } from '../constants/userConstants';
import { AppThunk } from '../types/utils';
import { BookingDispatchTypes } from '../types/booking/bookingActionTypes';
import { Booking } from '../types/booking/booking';
import { UserDispatchTypes } from '../types/user/userActionTypes';

export const createNewBooking = (
  newBookings: string[]
): AppThunk<BookingDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_CREATE_REQUEST });

    const {
      userAuth: { token },
      availableHourDetails: { date },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      '/api/v1/bookings',
      {
        date,
        time: newBookings,
      },
      config
    );

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: 'Booking created successfully',
    });
    dispatch({ type: BOOKING_STATUS_RESET });
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: BOOKING_STATUS_RESET });
  }
};

export const getUserBookings = (): AppThunk<
  BookingDispatchTypes | UserDispatchTypes
> => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_BOOKINGS_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    interface response {
      data: {
        bookings: Booking[];
      };
    }

    const {
      data: {
        data: { bookings },
      },
    }: AxiosResponse<response> = await axios.get(
      '/api/v1/bookings/getMyBookings',
      config
    );

    dispatch({
      type: USER_BOOKINGS_SUCCESS,
      payload: bookings,
    });
  } catch (error) {
    dispatch({
      type: USER_BOOKINGS_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: USER_BOOKINGS_RESET });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      dispatch({ type: USER_LOGOUT });
    }
  }
};

export const getAllBookings = (
  perPage: number,
  currentPage: number
): AppThunk<BookingDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_ALL_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    interface response {
      allTotal: number;
      data: {
        bookings: Booking[];
      };
    }

    const {
      data: {
        allTotal,
        data: { bookings },
      },
    }: AxiosResponse<response> = await axios.get(
      `/api/v1/bookings?limit=${perPage}&page=${currentPage}`,
      config
    );

    dispatch({
      type: BOOKING_ALL_SUCCESS,
      payload: { bookings, allTotal },
    });
  } catch (error) {
    dispatch({
      type: BOOKING_ALL_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: BOOKING_ALL_RESET });
  }
};

export const approveBooking = (
  id: string
): AppThunk<BookingDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_APPROVE_REQUEST, payload: id });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.patch(
      `/api/v1/bookings/${id}`,
      { status: 'confirmed' },
      config
    );

    dispatch({
      type: BOOKING_APPROVE_SUCCESS,
      payload: 'Booking approved successfully.',
    });
    dispatch({ type: BOOKING_APPROVE_RESET });
  } catch (error) {
    dispatch({
      type: BOOKING_APPROVE_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: BOOKING_APPROVE_RESET });
  }
};

export const deleteBooking = (
  id: string
): AppThunk<BookingDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_DELETE_REQUEST, payload: id });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/v1/bookings/${id}`, config);

    dispatch({
      type: BOOKING_DELETE_SUCCESS,
      payload: 'Booking deleted successfully.',
    });
    dispatch({ type: BOOKING_DELETE_RESET });
  } catch (error) {
    dispatch({
      type: BOOKING_DELETE_FAIL,
      payload: error.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
    dispatch({ type: BOOKING_DELETE_RESET });
  }
};
