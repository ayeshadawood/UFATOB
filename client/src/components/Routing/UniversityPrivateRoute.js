import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UniversityPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !loading && !isAuthenticated ? (
        <Redirect to='/' />
      ) : !loading && isAuthenticated && user !== null && user.type !== 1 ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

UniversityPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UniversityPrivateRoute);
