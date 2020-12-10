import {
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  CLEAR_AUTH_ERROR,
  CLEAR_AUTH_SUCCESS,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  USER_LOAD_DONE,
  USER_LOAD_RESET,
} from '../../constants/userConstants';
import { User } from './user';

export interface UserLoadRequest {
  type: typeof USER_LOAD_REQUEST;
}

export interface UserLoadDone {
  type: typeof USER_LOAD_DONE;
  payload: User;
}

export interface UserLoadSuccess {
  type: typeof USER_LOAD_SUCCESS;
}

export interface UserLoadFail {
  type: typeof USER_LOAD_FAIL;
  payload: string;
}

export interface UserLoadReset {
  type: typeof USER_LOAD_RESET;
}

export interface UserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

export interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: {
    token: string;
    user: User;
  };
}

export interface UserLoginFail {
  type: typeof USER_LOGIN_FAIL;
  payload: string;
}

export interface ClearAuthError {
  type: typeof CLEAR_AUTH_ERROR;
}

export interface UserSignupRequest {
  type: typeof USER_SIGNUP_REQUEST;
}

export interface UserSignupSuccess {
  type: typeof USER_SIGNUP_SUCCESS;
  payload: {
    token: string;
    user: User;
  };
}

export interface UserSignupFail {
  type: typeof USER_SIGNUP_FAIL;
  payload: string;
}

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

export interface UserDetailsUpdateRequest {
  type: typeof USER_DETAILS_UPDATE_REQUEST;
}

export interface UserDetailsUpdateSuccess {
  type: typeof USER_DETAILS_UPDATE_SUCCESS;
  payload: {
    user: User;
    success: string;
  };
}

export interface ClearAuthSuccess {
  type: typeof CLEAR_AUTH_SUCCESS;
}

export interface UserDetailsUpdateFail {
  type: typeof USER_DETAILS_UPDATE_FAIL;
  payload: string;
}

export interface UserPasswordUpdateRequest {
  type: typeof USER_PASSWORD_UPDATE_REQUEST;
}

export interface UserPasswordUpdateSuccess {
  type: typeof USER_PASSWORD_UPDATE_SUCCESS;
  payload: {
    token: string;
    user: User;
    success: string;
  };
}

export interface UserPasswordUpdateFail {
  type: typeof USER_PASSWORD_UPDATE_FAIL;
  payload: string;
}

export type UserDispatchTypes =
  | UserLoadRequest
  | UserLoadDone
  | UserLoadSuccess
  | UserLoadFail
  | UserLoadReset
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | ClearAuthError
  | UserSignupRequest
  | UserSignupSuccess
  | UserSignupFail
  | UserLogout
  | UserDetailsUpdateRequest
  | UserDetailsUpdateSuccess
  | UserDetailsUpdateFail
  | ClearAuthSuccess
  | UserPasswordUpdateRequest
  | UserPasswordUpdateSuccess
  | UserPasswordUpdateFail;
