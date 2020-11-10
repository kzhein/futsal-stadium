import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(state => state.userAuth);

  return (
    <div>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Futsal Stadium</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {isAuthenticated ? (
                <>
                  <LinkContainer to='/profile'>
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='#!'>
                    <Nav.Link onClick={() => dispatch(logout())}>
                      Logout
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/signup'>
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
