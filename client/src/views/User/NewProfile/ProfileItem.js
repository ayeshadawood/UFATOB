import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import PropTypes from "prop-types";
import "./profile-item.styles.css";
const ProfileItem = ({
  profile: { user, status, company, location, skills },
}) => {
  return (
    <Fragment>
      <div className='wrapper'>
        <div className='image-wrapper'>
          <img
            // src='https://theme.winnertheme.com/cholot/wp-content/uploads/2019/06/val-vesa-410839-unsplash-1024x683.jpg'
            src={user !== null ? user.avatar : ""}
            alt='personal display'
            className='image image-round'
          />
        </div>{" "}
        <div className='main-wrapper'>
          <div className='desc-wrapper'>
            <h3 className='title'>{user !== null ? user.name : ""}</h3>
            <p className='desc'>
              <span className="description">
                {status} {company && <span> at {company}</span>}
              </span>
              <br></br>
              {location && <span>{location}</span>}
            </p>
            {/* <p className='my-1'></p> */}
            <div className='butt'>
              <Link
                to={`/profile/${user !== null ? user._id : ""}`}
                className='btn btn-primary button'
              >
                View Profile
              </Link>
            </div>
          </div>
          <div className='center123'>
            <i class='fas fa-laptop-code icon'></i>
          </div>
          <ul>
            {skills.slice(0, 2).map((skill, index) => (
              <li key={index} className='text-primary'>
                {skill}
                {/* <i className='fas fa-check'></i> */}
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
