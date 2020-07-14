import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllStudents } from '../../../actions/student';
import { createTransaction } from '../../../actions/blockchain';
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

const CreateTransaction = ({
  getAllStudents,
  history,
  student: { loading, students },
  createTransaction,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    reference: '',
    reciever: '',
    amount: '',
    recieverName: '',
  });

  const { title, detail, reference, reciever, amount, recieverName } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'reciever') {
      if (e.target.value === 'Other') {
        setRecieverNameDisabled(false);
      } else {
        setRecieverNameDisabled(true);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTransaction(formData, history);
  };

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const [recieverNameDisabled, setRecieverNameDisabled] = useState(true);

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-user'></i> Fill in the following information to
        create a Smart Contract
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
              label='Contract Title'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='reference'
              value={reference}
              onChange={(e) => onChange(e)}
              label='Any Reference'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl
              variant='outlined'
              className={classes.formControl}
              margin='dense'
            >
              <InputLabel id='reciever'>Receiver</InputLabel>
              <Select
                labelId='reciever'
                label='Receiver'
                name='reciever'
                value={reciever}
                onChange={(e) => onChange(e)}
              >
                <MenuItem value=''>
                  <em>Please select the reciever</em>
                </MenuItem>
                {!loading &&
                  students.length > 0 &&
                  students.map((student) => (
                    <MenuItem value={student._id}>{student.name}</MenuItem>
                  ))}
                <MenuItem value='Other'>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='recieverName'
              value={recieverName}
              onChange={(e) => onChange(e)}
              label='Receiver name'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              disabled={recieverNameDisabled}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='amount'
              value={amount}
              onChange={(e) => onChange(e)}
              label='Amount'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='detail'
              value={detail}
              onChange={(e) => onChange(e)}
              label='Details'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              size='medium'
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              color='primary'
              variant='contained'
              //fullWidth={true}
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

CreateTransaction.propTypes = {
  getAllStudents: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  createTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});

export default connect(mapStateToProps, {
  getAllStudents,
  createTransaction,
})(withRouter(CreateTransaction));
