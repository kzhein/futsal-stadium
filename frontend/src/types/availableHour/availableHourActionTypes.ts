import {
  AVAILABLE_HOUR_REQUEST,
  AVAILABLE_HOUR_SUCCESS,
  AVAILABLE_HOUR_FAIL,
  TOGGLE_SELECTED_HOUR,
  SET_AVAILABLE_HOUR_DATE,
} from '../../constants/availableHourConstants';
import { AvailableHour } from './availableHour';

export interface AvailableHourRequest {
  type: typeof AVAILABLE_HOUR_REQUEST;
}

export interface AvailableHourSuccess {
  type: typeof AVAILABLE_HOUR_SUCCESS;
  payload: AvailableHour[];
}

export interface AvailableHourFail {
  type: typeof AVAILABLE_HOUR_FAIL;
  payload: string;
}

export interface ToggleSelectedHour {
  type: typeof TOGGLE_SELECTED_HOUR;
  payload: string;
}

export interface SetAvailableHourDate {
  type: typeof SET_AVAILABLE_HOUR_DATE;
  payload: string;
}

export type AvailableHourDispatchTypes =
  | AvailableHourRequest
  | AvailableHourSuccess
  | AvailableHourFail
  | ToggleSelectedHour
  | SetAvailableHourDate;
