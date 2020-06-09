import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { createRequest } from '../../../actions/request';
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

const CreateRequest = ({ createRequest, history }) => {
  const classes = useStyles();

  const getCurrentDate = () => {
    let d = new Date(Date.now());
    d = new Date(Date.now() + d.getTimezoneOffset() * 60000);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    fatherName: '',
    cnic: '',
    dateOfBirth: getCurrentDate(),
    institute: '',
    campus: '',
    registrationNumber: '',
    degreeProgram: '',
    department: '',
    semester: '',
    description: '',
    status: '1',
  });

  const {
    title,
    name,
    fatherName,
    cnic,
    dateOfBirth,
    institute,
    campus,
    registrationNumber,
    degreeProgram,
    department,
    semester,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createRequest(formData, history);
  };

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-user'></i> Fill in the following information to
        create a request
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
              label='Title'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
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
              name='fatherName'
              value={fatherName}
              onChange={(e) => onChange(e)}
              label='Father name'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='cnic'
              value={cnic}
              onChange={(e) => onChange(e)}
              label='CNIC'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='dateOfBirth'
              value={dateOfBirth}
              onChange={(e) => onChange(e)}
              label='Date of birth'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              type='date'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='institute'
              value={institute}
              onChange={(e) => onChange(e)}
              label='Institute'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='campus'
              value={campus}
              onChange={(e) => onChange(e)}
              label='Campus'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='registrationNumber'
              value={registrationNumber}
              onChange={(e) => onChange(e)}
              label='Registration number'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='degreeProgram'
              value={degreeProgram}
              onChange={(e) => onChange(e)}
              label='Degree program'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='department'
              value={department}
              onChange={(e) => onChange(e)}
              label='Department'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='semester'
              value={semester}
              onChange={(e) => onChange(e)}
              label='Semester'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
              label='Description'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              multiline
              rows={5}
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

CreateRequest.propTypes = {
  createRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { createRequest })(withRouter(CreateRequest));
