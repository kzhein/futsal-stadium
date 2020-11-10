import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_STATUS_RESET,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAIL,
} from '../constants/bookingConstants';

export const newBookingReducer = (
  state = {
    loading: false,
    success: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return {
        loading: true,
        success: null,
        error: null,
      };
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        error: null,
      };
    case BOOKING_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case BOOKING_STATUS_RESET:
      return {
        loading: false,
        success: null,
        error: null,
      };
    default:
      return state;
  }
};

export const userBookingsReducer = (
  state = {
    loading: false,
    bookings: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USER_BOOKINGS_REQUEST:
      return {
        loading: true,
        bookings: [],
        error: null,
      };
    case USER_BOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
        error: null,
      };
    case USER_BOOKINGS_FAIL:
      return {
        loading: false,
        bookings: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
