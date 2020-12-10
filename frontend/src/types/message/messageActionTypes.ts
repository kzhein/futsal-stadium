import { SET_MESSAGE, REMOVE_MESSAGE } from '../../constants/messageConstants';
import { Message } from './message';

export interface SetMessage {
  type: typeof SET_MESSAGE;
  payload: Message;
}

export interface RemoveMessage {
  type: typeof REMOVE_MESSAGE;
}

export type MessageDispatchTypes = SetMessage | RemoveMessage;
