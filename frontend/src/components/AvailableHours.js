import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Spinner } from 'react-bootstrap';

import AvailableHour from './AvailableHour';
import compareAvailableHour from '../utils/compareAvailableHour';

const AvailableHours = () => {
  const { loading, availableHours, date } = useSelector(
    state => state.availableHourDetails
  );

  const availableHoursRemaining = availableHours.filter(ava =>
    compareAvailableHour(date, ava.start)
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
