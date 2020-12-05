import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Spinner } from 'react-bootstrap';

import formatDate from '../utils/formatDate';
import { getUserBookings, resetUserBookings } from '../actions/bookingActions';
import { setMessage } from '../actions/messageActions';
import hasNotPassedTheCurrentTime from '../utils/hasNotPassedTheCurrentTime';

const UserBookings = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(state => state.userAuth);
  const { loading, bookings, error } = useSelector(state => state.userBookings);

  const bookingsRemaining = bookings.filter(bk =>
    hasNotPassedTheCurrentTime(bk.date, bk.time.start)
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserBookings());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error) {
      dispatch(setMessage({ text: error, type: 'danger' }));
      dispatch(resetUserBookings());
    }
  }, [error, dispatch]);

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
        ) : bookingsRemaining.length === 0 ? (
          <p>You have no bookings</p>
        ) : (
          bookingsRemaining.map(booking => (
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
