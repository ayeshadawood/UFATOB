import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { connect } from 'react-redux';
import { TextField, Button, Grid } from '@material-ui/core';
import { changeName } from '../../../actions/auth';

const Name = ({ classes, changeName }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeName(formData);
    setFormData({ ...formData, name: '' });
  };

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Name</h4>
            <p className={classes.cardCategoryWhite}>
              Use the form below to update your name
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={(e) => onSubmit(e)}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label='Name'
                    name='name'
                    value={name}
                    onChange={(e) => onChange(e)}
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
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

Name.propTypes = {
  classes: PropTypes.object.isRequired,
  changeName: PropTypes.func.isRequired,
};

export default connect(null, { changeName })(Name);
