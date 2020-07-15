import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Message = ({ message: { user, description }, auth }) => {
  return (
    <Fragment>
      <div
        style={{
          float: user._id === auth.user._id ? 'right' : 'left',
          background: 'white',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '10px',
          width: '80%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src={user.avatar}
          alt=''
          style={{
            width: '56px',
            height: '56px',
            marginRight: '10px',
            borderRadius: '50%',
          }}
        />
        <div>
          <div
            style={{
              marginBottom: '5px',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            {user.name}
          </div>
          <div
            style={{
              fontSize: '17px',
              textAlign: 'justify',
              textJustify: 'inter-word',
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Message;
