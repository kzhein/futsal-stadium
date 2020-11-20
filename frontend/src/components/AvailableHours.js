import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Spinner } from 'react-bootstrap';

import AvailableHour from './AvailableHour';

const AvailableHours = () => {
  const { loading, availableHours } = useSelector(
    state => state.availableHourDetails
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
      ) : (
        availableHours.map(ava => (
          <AvailableHour key={ava._id} availableHour={ava} />
        ))
      )}
    </Row>
  );
};

export default AvailableHours;
