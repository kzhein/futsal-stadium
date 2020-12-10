import { SET_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants';
import { Message } from '../types/message/message';
import { MessageDispatchTypes } from '../types/message/messageActionTypes';
import { AppThunk } from '../types/utils';

export const setMessage = (
  message: Message
): AppThunk<MessageDispatchTypes> => dispatch => {
  dispatch({ type: SET_MESSAGE, payload: message });
};

export const removeMessage = (): AppThunk<MessageDispatchTypes> => dispatch => {
  dispatch({ type: REMOVE_MESSAGE });
};
