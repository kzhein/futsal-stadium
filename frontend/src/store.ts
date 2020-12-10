import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userAuthReducer, userLoadReducer } from './reducers/userReducers';
import { availableHourReducer } from './reducers/availableHourReducers';
import {
  newBookingReducer,
  userBookingsReducer,
  allBookingsReducer,
  bookingApproveReducer,
  bookingDeleteReducer,
} from './reducers/bookingReducers';
import { messageReducer } from './reducers/messageReducers';
import { dayReducer } from './reducers/dayReducers';

const reducer = combineReducers({
  availableHourDetails: availableHourReducer,
  userAuth: userAuthReducer,
  userLoad: userLoadReducer,
  newBooking: newBookingReducer,
  userBookings: userBookingsReducer,
  allBookings: allBookingsReducer,
  bookingApprove: bookingApproveReducer,
  bookingDelete: bookingDeleteReducer,
  message: messageReducer,
  dayDetails: dayReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof reducer>;

export default store;
