import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

const MyConversationItem = ({ conversation: { _id, users }, auth }) => {
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
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link
            to={`/user/profile/${
              users.filter((item) => item.user._id !== auth.user._id)[0].user
                ._id
            }`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={
                users.filter((item) => item.user._id !== auth.user._id)[0].user
                  .avatar
              }
              alt=''
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              {
                users.filter((item) => item.user._id !== auth.user._id)[0].user
                  .name
              }
            </div>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div>
            <Link to={`/user/conversation/${_id}`}>
              <Button
                color='primary'
                variant='contained'
                style={{ marginRight: '5px', backgroundColor: '#202020' }}
              >
                Go to chat
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

MyConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default MyConversationItem;
