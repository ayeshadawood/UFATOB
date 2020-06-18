import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGroup } from '../../../actions/group';
import { withRouter } from 'react-router-dom';
import { Typography, Grid, TextField, Button } from '@material-ui/core';

const CreateGroup = ({ createGroup, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { name, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createGroup(formData, history);
  };

  return (
    <Fragment>
      <Typography variant='h5'>
        <i className='fas fa-user'></i> Fill in the following information to
        create a group
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
              margin='dense'
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
              margin='dense'
              multiline
              rows={5}
              style={{ marginBottom: '10px' }}
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

CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createGroup,
})(withRouter(CreateGroup));
