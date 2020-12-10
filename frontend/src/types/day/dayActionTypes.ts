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
} from '../../constants/dayConstants';
import { Day } from './day';

export interface DayListRequest {
  type: typeof DAY_LIST_REQUEST;
}

export interface DayListSuccess {
  type: typeof DAY_LIST_SUCCESS;
  payload: Day[];
}

export interface DayListFail {
  type: typeof DAY_LIST_FAIL;
  payload: string;
}

export interface ClearDaySuccess {
  type: typeof CLEAR_DAY_SUCCESS;
}

export interface ClearDayError {
  type: typeof CLEAR_DAY_ERROR;
}

export interface DayRequest {
  type: typeof DAY_REQUEST;
}

export interface DaySuccess {
  type: typeof DAY_SUCCESS;
  payload: Day;
}

export interface DayFail {
  type: typeof DAY_FAIL;
  payload: string;
}

export interface DayUpdateRequest {
  type: typeof DAY_UPDATE_REQUEST;
}

export interface DayUpdateSuccess {
  type: typeof DAY_UPDATE_SUCCESS;
  payload: {
    day: Day;
    success: string;
  };
}

export interface DayUpdateFail {
  type: typeof DAY_UPDATE_FAIL;
  payload: string;
}

export type DayDispatchTypes =
  | DayListRequest
  | DayListSuccess
  | DayListFail
  | ClearDaySuccess
  | ClearDayError
  | DayRequest
  | DaySuccess
  | DayFail
  | DayUpdateRequest
  | DayUpdateSuccess
  | DayUpdateFail;
