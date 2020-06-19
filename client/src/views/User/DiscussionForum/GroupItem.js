import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sendJoinRequest, deleteGroup } from '../../../actions/group';
import { connect } from 'react-redux';
import { Button, Typography, Grid, TextField } from '@material-ui/core';

const GroupItem = ({ group, auth, sendJoinRequest, deleteGroup }) => {
  return (
    <Fragment>
      <Grid
        container
        style={{
          backgroundColor: '#e6e6e6',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px',
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Link
            to={`/user/group/${group._id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            {group.name}
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div>{group.description}</div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Members:</strong> {group.members.length + 1}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {/* {auth.user !== null &&
            group.admin !== auth.user._id &&
            group.requests
              .map((request) => request.user)
              .indexOf(auth.user._id) === -1 &&
            group.members
              .map((member) => member.user)
              .indexOf(auth.user._id) === -1 && (
              <Button
                color='primary'
                variant='contained'
                onClick={() => sendJoinRequest(group._id)}
                style={{ marginRight: '5px' }}
              >
                <i className='far fa-envelope'></i> Join
              </Button>
            )} */}
          {auth.user !== null && group.admin === auth.user._id && (
            <Fragment>
              <Link to={`/user/edit-group/${group._id}`}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => sendJoinRequest(group._id)}
                  style={{ marginRight: '5px', backgroundColor: 'green' }}
                >
                  Update
                </Button>
              </Link>
              <Button
                color='primary'
                variant='contained'
                onClick={() => sendJoinRequest(group._id)}
                style={{ marginRight: '5px', backgroundColor: 'red' }}
                onClick={() => deleteGroup(group._id)}
              >
                Delete
              </Button>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  sendJoinRequest: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
};

export default connect(null, {
  sendJoinRequest,
  deleteGroup,
})(GroupItem);
