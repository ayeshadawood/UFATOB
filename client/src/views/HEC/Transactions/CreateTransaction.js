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
import { getAllUniversities } from '../../../actions/university';
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
  getAllUniversities,
  history,
  university: { loading, universities },
  createTransaction,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    reciever: '',
    amount: '',
  });

  const { reciever, amount } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTransaction(formData, history);
  };

  useEffect(() => {
    getAllUniversities();
  }, [getAllUniversities]);

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-user'></i> Fill in the following information to
        create a transaction
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
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
                  universities.length > 0 &&
                  universities.map((university) => (
                    <MenuItem value={university._id}>
                      {university.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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

CreateTransaction.propTypes = {
  getAllUniversities: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  university: PropTypes.object.isRequired,
  createTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  university: state.university,
});

export default connect(mapStateToProps, {
  getAllUniversities,
  createTransaction,
})(withRouter(CreateTransaction));
