import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import GridItem from '../../../components/Grid/GridItem.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import { connect } from 'react-redux';
import { TextField, Button, Grid } from '@material-ui/core';
import { setAlert } from '../../../actions/alert';
import { changePassword } from '../../../actions/auth';

const Password = ({ classes, setAlert, changePassword }) => {
  const [formData, setFormData] = useState({
    password: '',
    password1: '',
  });

  const { password, password1 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password1) {
      setAlert('Passwords do not match', 'error');
    } else {
      changePassword(password);
      setFormData({ ...formData, password: '', password1: '' });
    }
  };

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Password</h4>
            <p className={classes.cardCategoryWhite}>
              Use the form below to update your password
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => onSubmit(e)}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label='Password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                    className={classes.input}
                    margin='dense'
                    type='password'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label='Confirm password'
                    name='password1'
                    value={password1}
                    onChange={(e) => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                    className={classes.input}
                    margin='dense'
                    type='password'
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
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

Password.propTypes = {
  classes: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, changePassword })(Password);
