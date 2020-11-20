import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Button, Container, Form, Spinner, Table } from 'react-bootstrap';
import {
  getAllBookings,
  resetAllBookings,
  approveBooking,
  resetBookingApprove,
  deleteBooking,
  resetBookingDelete,
} from '../actions/bookingActions';
import { setMessage } from '../actions/messageActions';
import formatDate from '../utils/formatDate';
import getDay from '../utils/getDay';

const BookingsListScreen = () => {
  const dispatch = useDispatch();

  const {
    loading: loadingGetBookings,
    bookings,
    allTotal,
    error: errorGetBookings,
  } = useSelector(state => state.allBookings);

  const {
    bookingId: bookingToApprove,
    loading: loadingApproveBooking,
    error: errorApproveBooking,
    success: successApproveBooking,
  } = useSelector(state => state.bookingApprove);

  const {
    bookingId: bookingToDelete,
    loading: loadingDeleteBooking,
    error: errorDeleteBooking,
    success: successDeleteBooking,
  } = useSelector(state => state.bookingDelete);

  const [perPage, setPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllBookings(perPage, currentPage));
  }, [dispatch, perPage, currentPage]);

  useEffect(() => {
    if (successApproveBooking) {
      dispatch(setMessage({ text: successApproveBooking, type: 'success' }));
      dispatch(getAllBookings(perPage, currentPage));
      dispatch(resetBookingApprove());
    }

    if (errorApproveBooking) {
      dispatch(setMessage({ text: errorApproveBooking, type: 'danger' }));
      dispatch(getAllBookings(perPage, currentPage));
      dispatch(resetBookingApprove());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successApproveBooking, errorApproveBooking, dispatch]);

  useEffect(() => {
    if (successDeleteBooking) {
      dispatch(setMessage({ text: successDeleteBooking, type: 'success' }));
      dispatch(getAllBookings(perPage, currentPage));
      dispatch(resetBookingDelete());
    }

    if (errorDeleteBooking) {
      dispatch(setMessage({ text: errorDeleteBooking, type: 'danger' }));
      dispatch(getAllBookings(perPage, currentPage));
      dispatch(resetBookingDelete());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successDeleteBooking, errorDeleteBooking, dispatch]);

  useEffect(() => {
    if (errorGetBookings) {
      dispatch(setMessage({ text: errorGetBookings, type: 'danger' }));
      dispatch(resetAllBookings());
    }
  }, [errorGetBookings, dispatch]);

  const handlePageClick = data => {
    setCurrentPage(data.selected + 1);
  };

  const handleApprove = id => {
    if (window.confirm('Approve this booking?')) {
      dispatch(approveBooking(id));
    }
  };

  const handleDelete = id => {
    if (window.confirm('Delete this booking?')) {
      dispatch(deleteBooking(id));
    }
  };

  return (
    <Container className='py-3'>
      <h3 className='text-center mb-3'>Manage bookings</h3>
      <Form.Group controlId='perPage' className='float-right'>
        <Form.Label>Per page</Form.Label>
        <Form.Control
          as='select'
          size='sm'
          value={perPage}
          onChange={e => setPerPage(e.target.value * 1)}
        >
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
        </Form.Control>
      </Form.Group>
      {loadingGetBookings ? (
        <Spinner
          animation='border'
          variant='primary'
          style={{ width: '50px', height: '50px' }}
          className='d-block mx-auto my-5'
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>
                  {booking.user.name} ({booking.user.email})
                </td>
                <td>
                  {formatDate(booking.date)} ({getDay(booking.date)})
                </td>
                <td>{booking.time.time}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === 'pending' && (
                    <Button
                      variant='success'
                      size='sm'
                      className='mr-1 mb-1'
                      onClick={() => handleApprove(booking._id)}
                      disabled={
                        loadingApproveBooking &&
                        bookingToApprove === booking._id
                      }
                    >
                      {loadingApproveBooking &&
                      bookingToApprove === booking._id ? (
                        <Spinner
                          as='span'
                          animation='border'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />
                      ) : (
                        <i className='fas fa-check-circle'></i>
                      )}
                    </Button>
                  )}

                  <Button
                    variant='danger'
                    size='sm'
                    onClick={() => handleDelete(booking._id)}
                    disabled={
                      loadingDeleteBooking && bookingToDelete === booking._id
                    }
                  >
                    {loadingDeleteBooking && bookingToDelete === booking._id ? (
                      <Spinner
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                      />
                    ) : (
                      <i className='fas fa-trash'></i>
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ReactPaginate
        pageCount={Math.ceil(allTotal / perPage)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        initialPage={currentPage - 1}
        containerClassName='pagination justify-content-sm-center overflow-auto'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
      />
    </Container>
  );
};

export default BookingsListScreen;
