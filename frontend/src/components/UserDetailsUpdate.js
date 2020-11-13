import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button, Spinner } from 'react-bootstrap';

import {
  updateUserDetails,
  clearAuthSuccess,
  clearAuthError,
} from '../actions/userActions';
import { setMessage } from '../actions/messageActions';

const UserDetailsUpdate = () => {
  const dispatch = useDispatch();

  const { user, loading, success, error } = useSelector(
    state => state.userAuth
  );

  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    if (success) {
      dispatch(setMessage({ text: success, type: 'success' }));
      dispatch(clearAuthSuccess());
    }

    if (error) {
      dispatch(setMessage({ text: error, type: 'danger' }));
      dispatch(clearAuthError());
    }
  }, [success, error]);

  const onSubmit = values => dispatch(updateUserDetails(values));

  return (
    <>
      <h3 className='text-center'>Your Account</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            defaultValue={user && user.name}
            type='text'
            name='name'
            placeholder='Enter Name'
            ref={register({
              required: 'Name is required',
            })}
          />
          {errors.name && (
            <Form.Text className='text-danger'>{errors.name.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            defaultValue={user && user.phone}
            type='number'
            name='phone'
            placeholder='Enter phone'
            ref={register({
              required: 'Phone number is required',
            })}
          />
          {errors.phone && (
            <Form.Text className='text-danger'>
              {errors.phone.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant='primary' type='submit' disabled={loading}>
          {loading ? 'Loading' : 'Update'}
          {loading && (
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
    </>
  );
};

export default UserDetailsUpdate;
