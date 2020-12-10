import { SET_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants';
import { MessageState } from '../types/message/message';
import { MessageDispatchTypes } from '../types/message/messageActionTypes';

export const messageReducer = (
  state: MessageState = {
    message: null,
  },
  action: MessageDispatchTypes
): MessageState => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        message: action.payload,
      };
    case REMOVE_MESSAGE:
      return {
        message: null,
      };
    default:
      return state;
  }
};
