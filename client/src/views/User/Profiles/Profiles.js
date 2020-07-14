import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../../actions/profile';
import { CircularProgress } from '@material-ui/core';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Community</h1>
      <p className='lead' style={{ fontSize: '2rem', marginBottom: '10px' }}>
        <i className='fab fa-connectdevelop'></i> Browse and Connect with Others
      </p>
      {loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <div className='profiles'>
            <div className='row'>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <div className='col md3'>
                    <ProfileItem key={profile._id} profile={profile} />
                  </div>
                ))
              ) : (
                <h3>No Profiles Found</h3>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
