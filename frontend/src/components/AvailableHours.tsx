import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Spinner } from 'react-bootstrap';

import { RootStore } from '../store';
import AvailableHour from './AvailableHour';
import hasNotPassedTheCurrentTime from '../utils/hasNotPassedTheCurrentTime';

const AvailableHours: React.FC = () => {
  const { loading, availableHours, date } = useSelector(
    (state: RootStore) => state.availableHourDetails
  );

  const availableHoursRemaining = availableHours.filter(ava =>
    hasNotPassedTheCurrentTime(date!, ava.start)
  );

  return (
    <Row>
      {loading ? (
        <Spinner
          animation='grow'
          variant='primary'
          style={{ width: '50px', height: '50px' }}
          className='mx-auto my-5'
        />
      ) : availableHoursRemaining.length === 0 ? (
        <p className='mx-auto'>There is no section available today</p>
      ) : (
        availableHoursRemaining.map(ava => (
          <AvailableHour key={ava._id} availableHour={ava} />
        ))
      )}
    </Row>
  );
};

export default AvailableHours;
