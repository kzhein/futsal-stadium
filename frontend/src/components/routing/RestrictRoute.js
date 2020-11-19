import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictRoute = ({ component: Component, allowed, ...rest }) => {
  let { loading, user } = useSelector(state => state.userAuth);

  if (!user) {
    user = { role: '' };
  }

  return (
    <Route
      {...rest}
      render={props =>
        !loading && !allowed.includes(user.role) ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RestrictRoute;
