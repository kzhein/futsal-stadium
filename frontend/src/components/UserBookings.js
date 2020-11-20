import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Spinner } from 'react-bootstrap';

import formatDate from '../utils/formatDate';
import { getUserBookings } from '../actions/bookingActions';

const UserBookings = () => {
  const dispatch = useDispatch();

  const { loading, bookings } = useSelector(state => state.userBookings);

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  return (
    <>
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
            <ListGroup.Item key={booking._id}>
              <Row>
                <Col>{`${formatDate(booking.date)} ${booking.time.time}`}</Col>
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
    </>
  );
};

export default UserBookings;
