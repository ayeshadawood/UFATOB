import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Button } from '@material-ui/core';

import PropTypes from 'prop-types';
import './profile-item.styles.css';
const ProfileItem = ({
  profile: { user, status, company, location, skills },
}) => {
  return (
    <Fragment>
      <div className='wrapper'>
        <div className='image-wrapper center123'>
          <img
            src={user !== null ? user.avatar : ''}
            alt='personal display'
            className='image image-round'
          />
        </div>{' '}
        <div className='main-wrapper'>
          <div className='desc-wrapper'>
            <h3 className='title'>{user !== null ? user.name : ''}</h3>
            <p className='desc'>
              <span className='description'>
                {status} {company && <span> at {company}</span>}
              </span>
              <br></br>
              {location && (
                <span style={{ fontSize: '1.5rem' }}>{location}</span>
              )}
            </p>
            <div className='butt'>
              <Link to={`/user/profile/${user !== null ? user._id : ''}`}>
                <Button color='primary' variant='contained'>
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className='center123' style={{ marginBottom: '5px' }}>
            <i class='fas fa-laptop-code icon'></i>
          </div>
          <ul>
            {skills.slice(0, 2).map((skill, index) => (
              <li
                key={index}
                className='text-primary'
                style={{
                  listStyle: 'none',
                  fontSize: '1.5rem',
                  marginBottom: '5px',
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
