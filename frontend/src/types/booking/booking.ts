import { User } from '../user/user';

export interface OpenHour {
  _id: string;
  time: string;
  start: number;
  end: number;
  selected?: boolean;
}

export interface Booking {
  _id: string;
  status: 'pending' | 'confirmed';
  user: User;
  date: string;
  time: OpenHour;
}

export interface NewBookingState {
  loading: boolean;
  success: null | string;
  error: null | string;
}

export interface UserBookingsState {
  loading: boolean;
  bookings: Booking[];
  error: null | string;
}

export interface AllBookingsState {
  loading: boolean;
  bookings: Booking[];
  allTotal: number;
  error: null | string;
}

export interface BookingApproveState {
  bookingId: null | string;
  loading: boolean;
  error: null | string;
  success: null | string;
}

export interface BookingDeleteState extends BookingApproveState {}
