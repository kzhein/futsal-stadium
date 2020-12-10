export interface Message {
  text: string;
  type: string;
}

export interface MessageState {
  message: null | Message;
}
