import axios from 'axios';
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

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const {
      userAuth: { token },
    } = getState();

    if (!token) {
      throw new Error();
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const {
      data: {
        data: { user },
      },
    } = await axios.get('/api/v1/users/me', config);

    dispatch({ type: USER_LOAD_SUCCESS, payload: user });
  } catch (error) {
    localStorage.removeItem('token');

    dispatch({
      type: USER_LOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = values => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: {
        token,
        data: { user },
      },
    } = await axios.post('/api/v1/users/login', values, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { token, user },
    });

    localStorage.setItem('token', token);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const signup = values => async dispatch => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: {
        token,
        data: { user },
      },
    } = await axios.post('/api/v1/users/signup', values, config);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: { token, user },
    });

    localStorage.setItem('token', token);
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: USER_LOGOUT });
};
