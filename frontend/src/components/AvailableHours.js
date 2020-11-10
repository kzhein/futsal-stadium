import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Spinner } from 'react-bootstrap';
import AvailableHour from './AvailableHour';

const AvailableHours = () => {
  const { loading, availableHours, error } = useSelector(
    state => state.availableHourDetails
  );

  return (
    <Row className='mt-3'>
      {loading ? (
        <Spinner
          animation='grow'
          variant='primary'
          style={{ width: '50px', height: '50px' }}
          className='mx-auto my-5'
        />
      ) : (
        availableHours.map(ava => (
          <AvailableHour
            key={ava._id}
            // selectSection={selectSection}
            availableHour={ava}
          />
        ))
      )}
    </Row>
  );
};

export default AvailableHours;
