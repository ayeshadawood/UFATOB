import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroupById, updateGroup } from '../../../actions/group';
import { Typography, Grid, TextField, Button } from '@material-ui/core';

const EditGroup = ({
  getGroupById,
  match,
  group: { loading, group },
  updateGroup,
  history,
}) => {
  const [groupCalled, setGroupCalled] = useState(false);

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
    updateGroup(formData, match.params.id, history);
  };

  useEffect(() => {
    if (!groupCalled) {
      getGroupById(match.params.id);
      setGroupCalled(true);
    }

    setFormData({
      name: !loading && group !== null ? group.name : '',
      description: !loading && group !== null ? group.description : '',
    });
    // eslint-disable-next-line
  }, [getGroupById, loading, match.params.id]);

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

EditGroup.propTypes = {
  getGroupById: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  updateGroup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getGroupById,
  updateGroup,
})(withRouter(EditGroup));
