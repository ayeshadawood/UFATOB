import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../../../actions/post';
import { Button, Grid } from '@material-ui/core';

const PostItem = ({
  post: { _id, user, description, likes },
  auth,
  deletePost,
  likePost,
  unlikePost,
  styles,
}) => {
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
            to={`/university/profile/${user._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={user.avatar}
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
              {user.name}
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
          <div style={{ marginBottom: '5px' }}>{description}</div>
          <div>
            <Button
              color='primary'
              variant='contained'
              onClick={() => likePost(_id)}
              style={{ marginRight: '5px', backgroundColor: '#202020' }}
            >
              {likes.length > 0 ? likes.length : ''}
              <i
                className='fas fa-thumbs-up'
                style={{ marginRight: '5px', marginLeft: '5px' }}
              ></i>{' '}
              Like
            </Button>
            <Button
              color='primary'
              variant='contained'
              onClick={() => unlikePost(_id)}
              style={{ marginRight: '5px', backgroundColor: '#202020' }}
            >
              <i
                className='fas fa-thumbs-down'
                style={{ marginRight: '5px' }}
              ></i>{' '}
              Unlike
            </Button>
            <Link to={`/university/post/${_id}`}>
              <Button
                color='primary'
                variant='contained'
                style={{ marginRight: '5px' }}
              >
                View
              </Button>
            </Link>
            {auth.user !== null && auth.user._id === user._id && (
              <Button
                color='primary'
                variant='contained'
                onClick={() => deletePost(_id)}
                style={{ backgroundColor: 'red' }}
              >
                Delete
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

export default connect(null, {
  deletePost,
  likePost,
  unlikePost,
})(PostItem);
