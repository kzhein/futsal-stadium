import axios, { AxiosResponse } from 'axios';
import {
  User,
  UserLoginData,
  UserSignupData,
  UserUpdateData,
  UserPasswordUpdateData,
} from '../types/user/user';
import { UserDispatchTypes } from '../types/user/userActionTypes';
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
} from '../constants/userConstants';
import { AppThunk } from '../types/utils';

export const loadUser = (): AppThunk<UserDispatchTypes> => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    if (!token) {
      throw new Error('There is no token');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    interface response {
      data: {
        user: User;
      };
    }
    const {
      data: {
        data: { user },
      },
    }: AxiosResponse<response> = await axios.get('/api/v1/users/me', config);

    // dispatch USER_LOAD_DONE action first to make PrivateRoute and RestrictRoute work
    dispatch({
      type: USER_LOAD_DONE,
      payload: user,
    });
    dispatch({ type: USER_LOAD_SUCCESS });
  } catch (error) {
    localStorage.removeItem('token');

    dispatch({
      type: USER_LOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: USER_LOAD_RESET });
  }
};

export const login = (
  values: UserLoginData
): AppThunk<UserDispatchTypes> => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    interface response {
      token: string;
      data: {
        user: User;
      };
    }

    const {
      data: {
        token,
        data: { user },
      },
    }: AxiosResponse<response> = await axios.post(
      '/api/v1/users/login',
      values,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { token, user },
    });

    localStorage.setItem('token', token);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: CLEAR_AUTH_ERROR });
  }
};

export const signup = (
  values: UserSignupData
): AppThunk<UserDispatchTypes> => async dispatch => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    interface response {
      token: string;
      data: {
        user: User;
      };
    }

    const {
      data: {
        token,
        data: { user },
      },
    }: AxiosResponse<response> = await axios.post(
      '/api/v1/users/signup',
      values,
      config
    );

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: { token, user },
    });

    localStorage.setItem('token', token);
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: CLEAR_AUTH_ERROR });
  }
};

export const logout = (): AppThunk<UserDispatchTypes> => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: USER_LOGOUT });
};

export const updateUserDetails = (
  details: UserUpdateData
): AppThunk<UserDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_UPDATE_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    interface response {
      data: {
        user: User;
      };
    }
    const {
      data: {
        data: { user },
      },
    }: AxiosResponse<response> = await axios.patch(
      '/api/v1/users/updateMe',
      details,
      config
    );

    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: { user, success: 'User updated successfully' },
    });
    dispatch({ type: CLEAR_AUTH_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: CLEAR_AUTH_ERROR });
  }
};

export const updateUserPassword = (
  values: UserPasswordUpdateData
): AppThunk<UserDispatchTypes> => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PASSWORD_UPDATE_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    interface response {
      token: string;
      data: {
        user: User;
      };
    }

    const {
      data: {
        token: newToken,
        data: { user },
      },
    }: AxiosResponse<response> = await axios.patch(
      '/api/v1/users/updateMyPassword',
      values,
      config
    );

    dispatch({
      type: USER_PASSWORD_UPDATE_SUCCESS,
      payload: {
        token: newToken,
        user,
        success: 'User password updated successfully',
      },
    });
    dispatch({ type: CLEAR_AUTH_SUCCESS });

    localStorage.setItem('token', newToken);
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: CLEAR_AUTH_ERROR });
  }
};
