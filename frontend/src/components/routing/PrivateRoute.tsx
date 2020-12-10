import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootStore } from '../../store';

interface PrivateRouteProps {
  // component: React.FC<RouteComponentProps>;
  component: any;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useSelector((state: RootStore) => state.userAuth);
  const { loading } = useSelector((state: RootStore) => state.userLoad);

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
