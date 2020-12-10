import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ConfirmBookingScreen: React.FC = () => {
  return (
    <Row className='mt-3'>
      <Col md={6} className='mx-auto'>
        <h3 className='text-center'>Confirm Booking</h3>
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' />
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label>Phone</Form.Label>
            <Form.Control type='number' placeholder='Enter phone' />
          </Form.Group>

          <Form.Group controlId='note'>
            <Form.Label>Note</Form.Label>
            <Form.Control as='textarea' rows={4} placeholder='Enter note' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Confirm
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ConfirmBookingScreen;
