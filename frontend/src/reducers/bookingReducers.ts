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
import {
  AllBookingsState,
  BookingApproveState,
  BookingDeleteState,
  NewBookingState,
  UserBookingsState,
} from '../types/booking/booking';
import { BookingDispatchTypes } from '../types/booking/bookingActionTypes';

export const newBookingReducer = (
  state: NewBookingState = {
    loading: false,
    success: null,
    error: null,
  },
  action: BookingDispatchTypes
): NewBookingState => {
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
        success: null,
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
  state: UserBookingsState = {
    loading: false,
    bookings: [],
    error: null,
  },
  action: BookingDispatchTypes
): UserBookingsState => {
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
    case USER_BOOKINGS_RESET:
      return {
        loading: false,
        bookings: [],
        error: null,
      };
    default:
      return state;
  }
};

export const allBookingsReducer = (
  state: AllBookingsState = {
    loading: false,
    bookings: [],
    allTotal: 0,
    error: null,
  },
  action: BookingDispatchTypes
): AllBookingsState => {
  switch (action.type) {
    case BOOKING_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        bookings: [],
        error: null,
      };
    case BOOKING_ALL_SUCCESS:
      return {
        loading: false,
        bookings: action.payload.bookings,
        allTotal: action.payload.allTotal,
        error: null,
      };
    case BOOKING_ALL_FAIL:
      return {
        loading: false,
        bookings: [],
        allTotal: 0,
        error: action.payload,
      };
    case BOOKING_ALL_RESET:
      return {
        loading: false,
        bookings: [],
        allTotal: 0,
        error: null,
      };
    default:
      return state;
  }
};

export const bookingApproveReducer = (
  state: BookingApproveState = {
    bookingId: null,
    loading: false,
    error: null,
    success: null,
  },
  action: BookingDispatchTypes
): BookingApproveState => {
  switch (action.type) {
    case BOOKING_APPROVE_REQUEST:
      return {
        bookingId: action.payload,
        loading: true,
        error: null,
        success: null,
      };
    case BOOKING_APPROVE_SUCCESS:
      return {
        bookingId: null,
        loading: false,
        error: null,
        success: action.payload,
      };
    case BOOKING_APPROVE_FAIL:
      return {
        bookingId: null,
        loading: false,
        error: action.payload,
        success: null,
      };
    case BOOKING_APPROVE_RESET:
      return {
        bookingId: null,
        loading: false,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export const bookingDeleteReducer = (
  state: BookingDeleteState = {
    bookingId: null,
    loading: false,
    error: null,
    success: null,
  },
  action: BookingDispatchTypes
): BookingDeleteState => {
  switch (action.type) {
    case BOOKING_DELETE_REQUEST:
      return {
        bookingId: action.payload,
        loading: true,
        error: null,
        success: null,
      };
    case BOOKING_DELETE_SUCCESS:
      return {
        bookingId: null,
        loading: false,
        error: null,
        success: action.payload,
      };
    case BOOKING_DELETE_FAIL:
      return {
        bookingId: null,
        loading: false,
        error: action.payload,
        success: null,
      };
    case BOOKING_DELETE_RESET:
      return {
        bookingId: null,
        loading: false,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};
