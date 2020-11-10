import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import DatePicker from '../components/DatePicker';
import Fab from '../components/Fab';
import AvailableHours from '../components/AvailableHours';

const HomeScreen = () => {
  const { availableHours } = useSelector(state => state.availableHourDetails);
  // const [avaHours, setAvaHours] = useState(availableHours);
  const showFab = availableHours.find(ava => ava.selected === true);

  // useEffect(() => {
  //   if (availableHours.find(ava => ava.selected === true)) {
  //     setShowFab(true);
  //   } else {
  //     setShowFab(false);
  //   }
  // }, [availableHours]);

  // const selectSection = id => {
  //   setAvaHours(
  //     availableHours.map(ava => {
  //       if (ava._id === id) {
  //         ava.selected = !ava.selected;
  //       }
  //       return ava;
  //     })
  //   );
  // };

  return (
    <Row>
      <Col md={5} lg={4} xl={3}>
        <DatePicker />
      </Col>
      <Col md={7} lg={8} xl={9}>
        {/* <AvailableHours avaHours={avaHours} selectSection={selectSection} /> */}
        <AvailableHours />
      </Col>

      <Fab showFab={showFab} />
    </Row>
  );
};

export default HomeScreen;
