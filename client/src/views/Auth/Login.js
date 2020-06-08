import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import styles from '../../assets/jss/material-dashboard-react/layouts/authStyle';

const useStyles = makeStyles(styles);

const Login = ({ login, auth: { loading, isAuthenticated, user } }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (!loading && isAuthenticated && user !== null && user.type === 0) {
    return <Redirect to='/hec' />;
  } else if (!loading && isAuthenticated && user !== null && user.type === 2) {
    return <Redirect to='/user' />;
  }

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Typography variant='h3' className={classes.heading}>
            Login
          </Typography>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              label='Email'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              type='password'
              label='Password'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              color='primary'
              variant='contained'
              fullWidth={true}
              type='submit'
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
