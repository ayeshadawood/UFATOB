import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteProfile } from '../../../actions/profile';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';

const Dashboard = ({
  profile: { loading, profile },
  getCurrentProfile,
  auth: { user },
  deleteProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      {!loading && profile === null ? (
        <Fragment>
          <Typography variant='h5'>
            <i className='fas fa-user'></i> You have not setup a profile, please
            add some info
          </Typography>
          <Link to='/university/create-profile'>
            <Button
              color='primary'
              variant='contained'
              style={{ margin: '10px 0' }}
            >
              Create profile
            </Button>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <Typography variant='h4'>
            <i className='fas fa-user'></i> Welcome {user && user.name}
          </Typography>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Link to='/university/edit-profile'>
                <Button
                  color='primary'
                  variant='contained'
                  style={{ margin: '10px 0', marginRight: '10px' }}
                >
                  <i
                    className='fas fa-user-circle'
                    style={{ marginRight: '5px' }}
                  ></i>{' '}
                  Edit profile
                </Button>
              </Link>
            </GridItem>
            {profile !== null && <ProfileDetails profile={profile} />}
            <GridItem xs={12} sm={12} md={12}>
              <Button
                color='primary'
                variant='contained'
                style={{ backgroundColor: 'red' }}
                onClick={() => deleteProfile()}
              >
                <i className='fas fa-user' style={{ marginRight: '5px' }}></i>{' '}
                Delete account
              </Button>
            </GridItem>
          </GridContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(
  Dashboard
);
