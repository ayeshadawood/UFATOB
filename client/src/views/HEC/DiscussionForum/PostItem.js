import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../../../actions/post';
import { Button, Grid } from '@material-ui/core';
import { createConversation } from '../../../actions/conversation';

const PostItem = ({
  post: { _id, user, description, likes },
  auth,
  deletePost,
  likePost,
  unlikePost,
  createConversation,
  history,
}) => {
  const redirectToChat = async () => {
    const conversationId = await createConversation(auth.user._id, user._id);

    history.push(`/hec/conversation/${conversationId}`);
  };

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
            to={`/hec/profile/${user._id}`}
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
            <Link to={`/hec/post/${_id}`}>
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
            {auth.user !== null && auth.user._id !== user._id && (
              <Button
                variant='dark'
                className='mt-3'
                color='primary'
                variant='contained'
                onClick={() => redirectToChat()}
              >
                Chat
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
  createConversation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, {
  deletePost,
  likePost,
  unlikePost,
  createConversation,
})(withRouter(PostItem));
