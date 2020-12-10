import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { RootStore } from '../store';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootStore) => state.userAuth
  );

  const isAdmin = user && user.role === 'admin';

  return (
    <div>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='d-flex align-items-center'>
              <i
                className='far fa-futbol mr-1'
                style={{ fontSize: '40px' }}
              ></i>{' '}
              <span style={{ fontSize: '30px' }}>Futsal</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <NavDropdown title='Manage' id='manage'>
                      <LinkContainer to='/admin/days'>
                        <NavDropdown.Item>Days</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/bookings'>
                        <NavDropdown.Item>Bookings</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
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
