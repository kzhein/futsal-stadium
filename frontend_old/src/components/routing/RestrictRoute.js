import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictRoute = ({ component: Component, allowed, ...rest }) => {
  let { user } = useSelector(state => state.userAuth);
  const { loading } = useSelector(state => state.userLoad);

  return (
    <Route
      {...rest}
      render={props =>
        !loading && !allowed.includes(user ? user.role : '') ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RestrictRoute;
