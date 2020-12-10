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
import DaysListScreen from './screens/DaysListScreen';
import PrivateRoute from './components/routing/PrivateRoute';
import RestrictRoute from './components/routing/RestrictRoute';
import { loadUser } from './actions/userActions';
import DayEditScreen from './screens/DayEditScreen';
import BookingsListScreen from './screens/BookingsListScreen';
import MessageHandler from './components/MessageHandler';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <MessageHandler />
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
            <RestrictRoute
              path='/admin/days'
              component={DaysListScreen}
              allowed={['admin']}
              exact
            />
            <RestrictRoute
              path='/admin/days/:id/edit'
              component={DayEditScreen}
              allowed={['admin']}
            />
            <RestrictRoute
              path='/admin/bookings'
              component={BookingsListScreen}
              allowed={['admin']}
              exact
            />
          </Container>
        </div>
      </Router>
    </>
  );
};

export default App;
