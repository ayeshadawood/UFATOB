import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllConversationsForCurrentUser } from '../../../actions/conversation';
import MyConversationItem from './MyConversationItem';
import { Grid, Typography, CircularProgress } from '@material-ui/core';

const MyConversations = ({
  conversation: { loading, conversations },
  getAllConversationsForCurrentUser,
  auth,
}) => {
  const [
    getAllConversationForCurrentUserCalled,
    setGetAllConversationForCurrentUserCalled,
  ] = useState(false);

  useEffect(() => {
    if (!getAllConversationForCurrentUserCalled) {
      getAllConversationsForCurrentUser();
      setGetAllConversationForCurrentUserCalled(true);
    }
  }, []);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant='h5' style={{ marginBottom: '10px' }}>
            <i className='fas fa-user'></i> Below is a list of all your
            conversations
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
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
              <Grid container>
                {!loading && conversations.length > 0 ? (
                  conversations.map((conversation) => (
                    <Grid item xs={12} sm={12} md={12}>
                      <MyConversationItem
                        key={conversation._id}
                        conversation={conversation}
                        auth={auth}
                      />
                    </Grid>
                  ))
                ) : (
                  <Typography variant='h6' style={{ marginBottom: '10px' }}>
                    No conversations found
                  </Typography>
                )}
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

MyConversations.propTypes = {
  conversation: PropTypes.object.isRequired,
  getAllConversationsForCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  conversation: state.conversation,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllConversationsForCurrentUser,
})(MyConversations);
