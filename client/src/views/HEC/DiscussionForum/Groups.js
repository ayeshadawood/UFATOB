import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllGroups, searchGroup } from '../../../actions/group';
import PropTypes from 'prop-types';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import GroupItem from './GroupItem';
import { Link } from 'react-router-dom';

const Groups = ({
  getAllGroups,
  group: { loading, groups },
  auth,
  searchGroup,
}) => {
  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);

  const [formData, setFormData] = useState({
    description: '',
  });

  const { description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (description === '') {
      getAllGroups();
    } else {
      searchGroup(description);
    }
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Link to='/hec/create-group'>
            <Button
              color='primary'
              variant='contained'
              style={{ marginBottom: '10px' }}
            >
              Create new group
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant='h5' style={{ marginBottom: '10px' }}>
            <i className='fas fa-user'></i> Join a group or create your own
            group to start a discussion
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <form onSubmit={(e) => onSubmit(e)}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  name='description'
                  value={description}
                  onChange={(e) => onChange(e)}
                  label='Search group'
                  variant='outlined'
                  fullWidth={true}
                  margin='dense'
                />
              </Grid>
              <Button type='submit' style={{ visibility: 'hidden' }} />
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container>
            {!loading && groups.length > 0 ? (
              groups.map((group) => (
                <Grid item xs={12} sm={12} md={12}>
                  <GroupItem key={group._id} group={group} auth={auth} />
                </Grid>
              ))
            ) : (
              <Typography variant='h6' style={{ marginBottom: '10px' }}>
                No groups found
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Groups.propTypes = {
  getAllGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  searchGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllGroups,
  searchGroup,
})(Groups);
