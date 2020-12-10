import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { RootStore } from '../store';
import DatePicker from '../components/DatePicker';
import Fab from '../components/Fab';
import AvailableHours from '../components/AvailableHours';

const HomeScreen: React.FC = () => {
  const { availableHours } = useSelector(
    (state: RootStore) => state.availableHourDetails
  );
  const showFab = availableHours.find(ava => ava.selected === true);

  return (
    <Row>
      <Col md={5} lg={4} xl={3}>
        <DatePicker />
      </Col>
      <Col md={7} lg={8} xl={9}>
        <h3 className='text-center mt-3'>Pick the sections</h3>
        <AvailableHours />
      </Col>

      <Fab showFab={(showFab as unknown) as boolean} />
    </Row>
  );
};

export default HomeScreen;
