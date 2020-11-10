import axios from 'axios';
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_STATUS_RESET,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAIL,
} from '../constants/bookingConstants';

export const createNewBooking = newBookings => async (dispatch, getState) => {
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
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetBookingStatus = () => dispatch => {
  dispatch({ type: BOOKING_STATUS_RESET });
};

export const getUserBookings = () => async (dispatch, getState) => {
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

    const {
      data: {
        data: { bookings },
      },
    } = await axios.get('/api/v1/bookings/getMyBookings', config);

    dispatch({
      type: USER_BOOKINGS_SUCCESS,
      payload: bookings,
    });
  } catch (error) {
    dispatch({
      type: USER_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
