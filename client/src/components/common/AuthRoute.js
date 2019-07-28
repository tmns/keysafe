import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render = { props => !auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />}
  />
)

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AuthRoute);