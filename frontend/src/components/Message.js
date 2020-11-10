import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Row, Col } from 'react-bootstrap';
import { removeMessage } from '../actions/messageActions';

const Message = () => {
  const dispatch = useDispatch();

  const { message } = useSelector(state => state.message);

  return (
    message && (
      <Row>
        <Col md={7} className='mx-auto mt-4'>
          <Alert
            variant={message.type}
            onClose={() => dispatch(removeMessage())}
            dismissible
          >
            {message && message.text}
          </Alert>
        </Col>
      </Row>
    )
  );
};

export default Message;
