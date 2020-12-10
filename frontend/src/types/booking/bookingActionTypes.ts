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
} from '../../constants/bookingConstants';
import { Booking } from './booking';

export interface BookingCreateRequest {
  type: typeof BOOKING_CREATE_REQUEST;
}

export interface BookingCreateSuccess {
  type: typeof BOOKING_CREATE_SUCCESS;
  payload: string;
}

export interface BookingStatusReset {
  type: typeof BOOKING_STATUS_RESET;
}

export interface BookingCreateFail {
  type: typeof BOOKING_CREATE_FAIL;
  payload: string;
}

export interface UserBookingsRequest {
  type: typeof USER_BOOKINGS_REQUEST;
}

export interface UserBookingsSuccess {
  type: typeof USER_BOOKINGS_SUCCESS;
  payload: Booking[];
}

export interface UserBookingsReset {
  type: typeof USER_BOOKINGS_RESET;
}

export interface UserBookingsFail {
  type: typeof USER_BOOKINGS_FAIL;
  payload: string;
}

export interface BookingAllRequest {
  type: typeof BOOKING_ALL_REQUEST;
}

export interface BookingAllSuccess {
  type: typeof BOOKING_ALL_SUCCESS;
  payload: {
    bookings: Booking[];
    allTotal: number;
  };
}

export interface BookingAllFail {
  type: typeof BOOKING_ALL_FAIL;
  payload: string;
}

export interface BookingAllReset {
  type: typeof BOOKING_ALL_RESET;
}

export interface BookingApproveRequest {
  type: typeof BOOKING_APPROVE_REQUEST;
  payload: string;
}

export interface BookingApproveSuccess {
  type: typeof BOOKING_APPROVE_SUCCESS;
  payload: string;
}

export interface BookingApproveFail {
  type: typeof BOOKING_APPROVE_FAIL;
  payload: string;
}

export interface BookingApproveReset {
  type: typeof BOOKING_APPROVE_RESET;
}

export interface BookingDeleteRequest {
  type: typeof BOOKING_DELETE_REQUEST;
  payload: string;
}

export interface BookingDeleteSuccess {
  type: typeof BOOKING_DELETE_SUCCESS;
  payload: string;
}

export interface BookingDeleteFail {
  type: typeof BOOKING_DELETE_FAIL;
  payload: string;
}

export interface BookingDeleteReset {
  type: typeof BOOKING_DELETE_RESET;
}

export type BookingDispatchTypes =
  | BookingCreateRequest
  | BookingCreateSuccess
  | BookingCreateFail
  | BookingStatusReset
  | UserBookingsRequest
  | UserBookingsSuccess
  | UserBookingsReset
  | UserBookingsFail
  | BookingAllRequest
  | BookingAllSuccess
  | BookingAllFail
  | BookingAllReset
  | BookingApproveRequest
  | BookingApproveSuccess
  | BookingApproveFail
  | BookingApproveReset
  | BookingDeleteRequest
  | BookingDeleteSuccess
  | BookingDeleteFail
  | BookingDeleteReset;
