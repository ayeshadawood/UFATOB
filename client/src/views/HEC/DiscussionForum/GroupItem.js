import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteGroup } from '../../../actions/group';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';

const GroupItem = ({ group, auth, deleteGroup }) => {
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
            to={`/hec/group/${group._id}`}
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
          <div style={{ marginBottom: '10px' }}>{group.description}</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {auth.user !== null && group.admin === auth.user._id && (
            <Fragment>
              <Link to={`/hec/edit-group/${group._id}`}>
                <Button
                  color='primary'
                  variant='contained'
                  style={{ marginRight: '5px', backgroundColor: 'green' }}
                >
                  Update
                </Button>
              </Link>
              <Button
                color='primary'
                variant='contained'
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
  deleteGroup: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteGroup,
})(GroupItem);
