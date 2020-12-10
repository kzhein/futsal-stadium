import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';

interface RestrictRouteProps {
  // component: React.FC<RouteComponentProps>;
  component: any;
  allowed: string[];
  path: string;
  exact?: true;
}

const RestrictRoute: React.FC<RestrictRouteProps> = ({
  component: Component,
  allowed,
  ...rest
}) => {
  let { user } = useSelector((state: RootStore) => state.userAuth);
  const { loading } = useSelector((state: RootStore) => state.userLoad);

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
