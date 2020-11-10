import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { availableHourReducer } from './reducers/availableHourReducers';
import { userAuthReducer } from './reducers/userReducers';
import {
  newBookingReducer,
  userBookingsReducer,
} from './reducers/bookingReducers';
import { messageReducer } from './reducers/messageReducers';

const reducer = combineReducers({
  availableHourDetails: availableHourReducer,
  userAuth: userAuthReducer,
  newBooking: newBookingReducer,
  userBookings: userBookingsReducer,
  message: messageReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
