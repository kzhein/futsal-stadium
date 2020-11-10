import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Message from './components/Message';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConfirmBookingScreen from './screens/ConfirmBookingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/userActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header />
        <Container>
          <Message />
          <Route path='/' component={HomeScreen} exact />
          <PrivateRoute path='/profile' component={ProfileScreen} />
          <PrivateRoute
            path='/confirm-booking'
            component={ConfirmBookingScreen}
          />
          <Route path='/login' component={LoginScreen} />
          <Route path='/signup' component={SignupScreen} />
        </Container>
      </div>
    </Router>
  );
};

export default App;
