import React from 'react';
import { Row, Col } from 'react-bootstrap';

import UserDetailsUpdate from '../components/UserDetailsUpdate';
import UserBookings from '../components/UserBookings';
import UserPasswordUpdate from '../components/UserPasswordUpdate';

const ProfileScreen = () => {
  return (
    <Row className='mt-3'>
      <Col md={6} className='mb-4'>
        <UserBookings />
      </Col>
      <Col md={6} className='mb-4'>
        <UserDetailsUpdate />
      </Col>
      <Col md={6} className='mb-4'>
        <UserPasswordUpdate />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
