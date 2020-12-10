import { SET_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants';

export const setMessage = message => dispatch => {
  dispatch({ type: SET_MESSAGE, payload: message });
};

export const removeMessage = () => dispatch => {
  dispatch({ type: REMOVE_MESSAGE });
};
