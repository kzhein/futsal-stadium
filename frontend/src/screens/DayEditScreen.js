import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  getDay,
  updateDay,
  clearDayError,
  clearDaySuccess,
} from '../actions/dayActions';
import { setMessage } from '../actions/messageActions';

const DayEditScreen = ({ match }) => {
  const dispatch = useDispatch();

  const [openHours, setOpenHours] = useState([]);
  const { day, loading, error, success } = useSelector(
    state => state.dayDetails
  );
  const { token } = useSelector(state => state.userAuth);

  const showLoading = loading || openHours.length === 0;

  const id = match.params.id;

  useEffect(() => {
    if (success) {
      dispatch(setMessage({ text: success, type: 'success' }));
      dispatch(clearDaySuccess());
    }

    if (error) {
      dispatch(setMessage({ text: error, type: 'danger' }));
      dispatch(clearDayError());
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    dispatch(getDay(id));
  }, [dispatch, id]);

  useEffect(() => {
    let isSubscribed = true;

    if (day) {
      (async () => {
        const { data } = await axios.get('/api/v1/openhours', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const checkedHours = data.data.openHours.map(oh => {
          if (day.openHours.find(oh2 => oh2._id === oh._id)) {
            return {
              ...oh,
              selected: true,
            };
          }
          return oh;
        });

        if (isSubscribed) {
          setOpenHours(checkedHours);
        }
      })();
    }

    return () => (isSubscribed = false);
  }, [day, token]);

  const toggleSelected = id =>
    setOpenHours(
      openHours.map(openHour =>
        openHour._id === id
          ? { ...openHour, selected: !openHour.selected }
          : openHour
      )
    );

  const submitHandler = e => {
    e.preventDefault();

    const hoursToUpdate = openHours
      .filter(openHour => openHour.selected)
      .map(openHour => openHour._id);

    setOpenHours([]);

    dispatch(updateDay(hoursToUpdate));
  };

  return (
    <div className='py-3'>
      <h3 className='text-center mb-2'>{day && day.day}</h3>

      <Form onSubmit={submitHandler}>
        {showLoading ? (
          <Spinner
            animation='border'
            variant='primary'
            style={{ width: '50px', height: '50px' }}
            className='d-block mx-auto my-5'
          />
        ) : (
          <>
            <LinkContainer to='/admin/days'>
              <Button variant='light' className='my-2'>
                Go Back
              </Button>
            </LinkContainer>
            <Row>
              {openHours.map(openHour => (
                <Col
                  key={openHour._id}
                  xs={6}
                  md={3}
                  className='my-2  text-md-left'
                >
                  <Form.Check
                    type='checkbox'
                    label={openHour.time}
                    checked={openHour.selected || false}
                    onChange={() => toggleSelected(openHour._id)}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}

        <Button
          variant='primary'
          className='mt-3'
          type='submit'
          disabled={showLoading}
        >
          {showLoading ? 'Loading' : 'Submit'}
          {showLoading && (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
              className='ml-1'
            />
          )}
        </Button>
      </Form>
    </div>
  );
};

export default DayEditScreen;
