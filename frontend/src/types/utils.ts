import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootStore } from '../store';

export type AppThunk<T extends Action<any>> = ThunkAction<
  void,
  RootStore,
  unknown,
  T
>;
