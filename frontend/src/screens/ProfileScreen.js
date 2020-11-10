import React from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';

const ProfileScreen = () => {
  return (
    <Row className='mt-3'>
      <Col md={6} className='mb-4'>
        <h3 className='text-center'>Your Bookings</h3>
        <ListGroup variant='flush' className='text-center'>
          <ListGroup.Item>
            <Row>
              <Col>24/10/2020 5:00 - 6:00 PM</Col>
              <Col>Confirmed</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>24/10/2020 5:00 - 6:00 PM</Col>
              <Col>Confirmed</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>24/10/2020 5:00 - 6:00 PM</Col>
              <Col>Confirmed</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>24/10/2020 5:00 - 6:00 PM</Col>
              <Col>Confirmed</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>24/10/2020 5:00 - 6:00 PM</Col>
              <Col>Confirmed</Col>
            </Row>
          </ListGroup.Item>
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
