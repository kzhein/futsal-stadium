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
} from '../constants/userConstants';

export const userAuthReducer = (
  state = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
    case USER_LOGIN_REQUEST:
    case USER_LOAD_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null,
      };
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case USER_SIGNUP_FAIL:
    case USER_LOGIN_FAIL:
    case USER_LOAD_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        error: null,
      };
    case USER_LOGOUT:
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
