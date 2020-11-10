import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, ListGroup, Spinner } from 'react-bootstrap';

import { getUserBookings } from '../actions/bookingActions';
import formatDate from '../utils/formatDate';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { loading, bookings } = useSelector(state => state.userBookings);

  useEffect(() => {
    dispatch(getUserBookings());
  }, []);

  return (
    <Row className='mt-3'>
      <Col md={6} className='mb-4'>
        <h3 className='text-center'>Your Bookings</h3>
        <ListGroup variant='flush' className='text-center'>
          {loading ? (
            <Spinner
              animation='grow'
              variant='primary'
              style={{ width: '50px', height: '50px' }}
              className='mx-auto my-5'
            />
          ) : bookings.length === 0 ? (
            <p>You have no bookings</p>
          ) : (
            bookings.map(booking => (
              <ListGroup.Item>
                <Row>
                  <Col>{`${formatDate(new Date(booking.date))} ${
                    booking.time.time
                  }`}</Col>
                  <Col>
                    <span
                      className={
                        booking.status === 'pending'
                          ? 'text-warning'
                          : 'text-success'
                      }
                    >
                      {booking.status}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Col>
      <Col md={6} className='mb-4'>
        <h3 className='text-center'>Your Account</h3>
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value='John Doe'
            />
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter phone'
              value='09234242'
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={6} className='mb-4'>
        <h3 className='text-center'>Update Password</h3>
        <Form>
          <Form.Group controlId='currentPassword'>
            <Form.Label>Current Password</Form.Label>
            <Form.Control type='password' />
          </Form.Group>

          <Form.Group controlId='newPassword'>
            <Form.Label>New Password</Form.Label>
            <Form.Control type='password' />
          </Form.Group>

          <Form.Group controlId='newPasswordConfirm'>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type='password' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
