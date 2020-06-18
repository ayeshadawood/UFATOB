import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById, addComment } from '../../../actions/post';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import CommentItem from './CommentItem';

const Post = ({
  post: { post, loading },
  getPostById,
  match,
  auth,
  addComment,
}) => {
  const [formData, setFormData] = useState({
    description: '',
  });

  const { description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(post._id, formData);
    setFormData({ description: '' });
  };

  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);

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
            to={`/profile/${!loading && post !== null ? post.user._id : ''}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={!loading && post !== null ? post.user.avatar : ''}
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
              {!loading && post !== null ? post.user.name : ''}
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
          <div>{!loading && post !== null ? post.description : ''}</div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <form onSubmit={(e) => onSubmit(e)}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  name='description'
                  value={description}
                  onChange={(e) => onChange(e)}
                  label='Comment description'
                  variant='outlined'
                  fullWidth={true}
                  margin='dense'
                  multiline
                  rows={5}
                  style={{ marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  style={{ marginBottom: '10px' }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {post !== null && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id}>
                <CommentItem comment={comment} auth={auth} post={post} />
              </div>
            ))
          ) : (
            <Typography variant='h6' style={{ marginBottom: '10px' }}>
              No comments found
            </Typography>
          )}
        </Grid>
      </Grid>
      {/* {!loading && post !== null && (
        <Fragment>
          <section className={styles.section}>
            <SideNav styles={styles} />

            <div
              className={`${styles.content} ${
                !auth.displaySideNav ? styles.side_nav_hidden : ''
              }`}
            >
              <Alert />
              <Row className={styles.list_item}>
                <Col xs={12} md={3}>
                  <Link to={`/profile/${post.user._id}`}>
                    <img src={post.user.avatar} alt='' className='round-img' />
                    <div className={styles.user_name}>{post.user.name}</div>
                  </Link>
                </Col>
                <Col xs={12} md={9}>
                  {post.description}
                </Col>
              </Row>
              <CommentForm post={post} />
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment._id}>
                    <CommentItem
                      comment={comment}
                      auth={auth}
                      post={post}
                      styles={styles}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.sub_heading}>No comments found</div>
              )}
            </div>
          </section>

          <Footer styles={styles} />
        </Fragment>
      )} */}
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPostById,
  addComment,
})(Post);
