import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from '../../../actions/auth';
import { withRouter } from 'react-router-dom';

const styles = {
  heading: {
    marginBottom: '16px',
  },
  input: {
    margin: '10px 0',
  },
  formControl: {
    width: '100%',
  },
};

const useStyles = makeStyles(styles);

const CreateStudent = ({ register, history, auth: { user } }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '111111',
    type: '2',
  });

  const { name, email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(formData, history, user._id);
  };

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-user'></i> Fill in the following information to
        create a student
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
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
            <Button
              color='primary'
              variant='contained'
              fullWidth={true}
              type='submit'
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

CreateStudent.propTypes = {
  register: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(
  withRouter(CreateStudent)
);
