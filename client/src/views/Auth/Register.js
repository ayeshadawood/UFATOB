import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

import styles from '../../assets/jss/material-dashboard-react/layouts/authStyle';

const useStyles = makeStyles(styles);

const Register = ({
  register,
  setAlert,
  auth: { loading, isAuthenticated, user },
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password1: '',
  });

  const { name, email, password, password1 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password1) {
      setAlert('Passwords do not match', 'error');
    } else {
      // Use this for registering a normal user
      // register(name, email, password, 2);
      // Use this for registering a university
      register(name, email, password, 1);
    }
  };

  if (!loading && isAuthenticated && user !== null && user.type === 1) {
    return <Redirect to='/university' />;
  } else if (!loading && isAuthenticated && user !== null && user.type === 2) {
    return <Redirect to='/user' />;
  }

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Typography variant='h3' className={classes.heading}>
            Register
          </Typography>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              label='Name'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
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
            <TextField
              name='password1'
              value={password1}
              onChange={(e) => onChange(e)}
              type='password'
              label='Confirm password'
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
