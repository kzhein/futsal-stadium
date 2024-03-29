import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { animated, useSpring } from 'react-spring';

import { createNewBooking } from '../actions/bookingActions';
import { getAvailableHours } from '../actions/availableHourActions';
import { setMessage } from '../actions/messageActions';
import { RootStore } from '../store';

interface FabProps {
  showFab: boolean;
}

const Fab: React.FC<FabProps> = ({ showFab }) => {
  const dispatch = useDispatch();

  const { availableHours, date } = useSelector(
    (state: RootStore) => state.availableHourDetails
  );
  const { loading, success, error } = useSelector(
    (state: RootStore) => state.newBooking
  );
  const { isAuthenticated } = useSelector((state: RootStore) => state.userAuth);

  const animation = useSpring({
    opacity: showFab ? 1 : 0,
    transform: showFab ? 'translateY(0) scale(1)' : 'translateY(100%) scale(0)',
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
      dispatch(getAvailableHours(date!));
    }
    if (error) {
      dispatch(getAvailableHours(date!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

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
