import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Community</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and Connect with
            Others
          </p>

          <div className='profiles'>
            <div className='row'>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <div className='col md3'>
                    <ProfileItem key={profile._id} profile={profile} />
                  </div>
                ))
              ) : (
                <h4>No Profile Found...</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
