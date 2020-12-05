import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button, Spinner } from 'react-bootstrap';

import { updateUserPassword } from '../actions/userActions';

const UserPasswordUpdate = () => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector(state => state.userAuth);

  const { handleSubmit, register, errors, getValues, reset } = useForm();

  useEffect(() => {
    if (success) {
      // reset form after success
      reset();
    }
  }, [success, reset]);

  const onSubmit = values => dispatch(updateUserPassword(values));

  return (
    <>
      <h3 className='text-center'>Update Password</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='currentPassword'>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type='password'
            name='passwordCurrent'
            ref={register({
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
          />
          {errors.passwordCurrent && (
            <Form.Text className='text-danger'>
              {errors.passwordCurrent.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='newPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            ref={register({
              required: 'New password is required',
              minLength: {
                value: 8,
                message: 'New password must have at least 8 characters',
              },
            })}
          />
          {errors.password && (
            <Form.Text className='text-danger'>
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='newPasswordConfirm'>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type='password'
            name='passwordConfirm'
            ref={register({
              validate: {
                passwordsMatch: value =>
                  value === getValues('password') || 'Passwords do not match',
              },
            })}
          />
          {errors.passwordConfirm && (
            <Form.Text className='text-danger'>
              {errors.passwordConfirm.message}
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

export default UserPasswordUpdate;
