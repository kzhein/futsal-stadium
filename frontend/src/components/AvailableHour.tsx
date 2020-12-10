import React from 'react';
import { useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { animated, useSpring } from 'react-spring';

import { toggleSelectedHour } from '../actions/availableHourActions';
import { AvailableHour as AvaHour } from '../types/availableHour/availableHour';

interface AvailableHourProps {
  availableHour: AvaHour;
}

const AvailableHour: React.FC<AvailableHourProps> = ({ availableHour }) => {
  const dispatch = useDispatch();

  const animation = useSpring({
    opacity: availableHour.selected ? 1 : 0,
    transform: availableHour.selected ? 'translateX(0)' : 'translateX(100%)',
    width: availableHour.selected ? 10 : 0,
  });

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
        <animated.i style={animation} className='fas fa-check ml-1' />
      </div>
    </Col>
  );
};

export default AvailableHour;
