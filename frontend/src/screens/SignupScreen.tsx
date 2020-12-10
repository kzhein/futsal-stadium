import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

import { signup } from '../actions/userActions';
import { RouteComponentProps } from 'react-router-dom';
import { RootStore } from '../store';
import { UserSignupData } from '../types/user/user';

interface SignupScreenProps extends RouteComponentProps {}

const SignupScreen: React.FC<SignupScreenProps> = ({ history }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector(
    (state: RootStore) => state.userAuth
  );
  const { handleSubmit, register, errors, getValues } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const onSubmit = (values: UserSignupData) => dispatch(signup(values));

  return (
    <div className='mt-3'>
      <Row>
        <Col md={5} className='mx-auto'>
          <h3 className='text-center'>Sign Up</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Name'
                ref={register({
                  required: 'Name is required',
                })}
              />
              {errors.name && (
                <Form.Text className='text-danger'>
                  {errors.name.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='text'
                name='email'
                placeholder='Email'
                ref={register({
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <Form.Text className='text-danger'>
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='number'
                name='phone'
                placeholder='Phone Number'
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

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Password'
                ref={register({
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                })}
              />
              {errors.password && (
                <Form.Text className='text-danger'>
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                type='password'
                name='passwordConfirm'
                placeholder='Password Confirm'
                ref={register({
                  validate: {
                    passwordsMatch: value =>
                      value === getValues('password') ||
                      'Passwords do not match',
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
              {loading ? 'Loading' : 'Submit'}
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
        </Col>
      </Row>
    </div>
  );
};

export default SignupScreen;
