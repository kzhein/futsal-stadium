import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { animated, useSpring } from 'react-spring';

import {
  createNewBooking,
  resetBookingStatus,
} from '../actions/bookingActions';
import { getAvailableHours } from '../actions/availableHourActions';
import { setMessage } from '../actions/messageActions';

const Fab = ({ showFab }) => {
  const dispatch = useDispatch();

  const { availableHours, date } = useSelector(
    state => state.availableHourDetails
  );
  const { loading, success, error } = useSelector(state => state.newBooking);
  const { isAuthenticated } = useSelector(state => state.userAuth);

  const animation = useSpring({
    opacity: showFab ? 1 : 0,
    transform: showFab ? 'translateY(0)' : 'translateY(100%)',
  });

  const handleSubmit = () => {
    if (isAuthenticated) {
      if (!loading) {
        const hoursToOrder = availableHours
          .filter(ava => ava.selected)
          .map(ava => ava._id);
        dispatch(createNewBooking(hoursToOrder));
      }
    } else {
      dispatch(setMessage({ text: 'Please log in to book', type: 'warning' }));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(setMessage({ text: success, type: 'success' }));
      dispatch(getAvailableHours(date));
      dispatch(resetBookingStatus());
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      dispatch(setMessage({ text: error, type: 'danger' }));
      dispatch(getAvailableHours(date));
      dispatch(resetBookingStatus());
    }
  }, [error]);

  return (
    <animated.div
      style={animation}
      className='fab bg-info'
      onClick={handleSubmit}
    >
      {loading ? (
        <Spinner
          as='span'
          animation='border'
          role='status'
          aria-hidden='true'
          id='loading'
        />
      ) : (
        <i className='fas fa-check'></i>
      )}
    </animated.div>
  );
};

export default Fab;
