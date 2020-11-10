import axios from 'axios';
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_STATUS_RESET,
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
      payload: error.response.data.message,
    });
  }
};

export const resetBookingStatus = () => dispatch => {
  dispatch({ type: BOOKING_STATUS_RESET });
};
