import React from 'react';
import { useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';

import { toggleSelectedHour } from '../actions/availableHourActions';

const AvailableHour = ({ availableHour }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!availableHour.booked) {
      dispatch(toggleSelectedHour(availableHour._id));
    }
  };

  return (
    <Col xs={6} md={4} lg={3}>
      <div
        onClick={handleClick}
        className={`available-hour mx-auto text-center m-2 bg-primary text-white ${
          availableHour.booked
            ? 'available-hour-booked bg-danger'
            : availableHour.selected && 'bg-secondary'
        }`}
      >
        {availableHour.booked ? 'Booked' : availableHour.time}
        {availableHour.selected && <i className='fas fa-check ml-1' />}
      </div>
    </Col>
  );
};

export default AvailableHour;
