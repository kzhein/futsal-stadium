import { SET_MESSAGE, REMOVE_MESSAGE } from '../constants/messageConstants';

export const messageReducer = (
  state = {
    message: null,
  },
  action
) => {
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
