import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getConversationById, addMessage } from '../../../actions/conversation';
import { setAlert } from '../../../actions/alert';
import Message from './Message';
import socketIOClient from 'socket.io-client';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

const Conversation = ({
  conversation: { loading, conversation },
  auth,
  getConversationById,
  match,
  setAlert,
  addMessage,
}) => {
  const [socket, setSocket] = useState(null);

  const messageBoxRef = useRef(null);

  const [getConversationByIdCalled, setGetConversationByIdCalled] = useState(
    false
  );

  useEffect(() => {
    // Only get the conversation once not more that once
    if (!getConversationByIdCalled) {
      getConversationById(match.params.id);
      setGetConversationByIdCalled(true);
    }

    if (socket === null) {
      // If the socket is not initalized then create a new socket connection
      setSocket(socketIOClient());
    } else if (socket !== null && auth.user !== null) {
      // If the socket is initilaized and the user is loaded then add the user to the current room
      socket.emit('joinRoom', { user: auth.user, room: match.params.id });

      // Display message that the other user has joined the chat
      socket.on('joinRoom', (message) => console.log(message));

      // When a message is received display it in the message box
      socket.on('message', (conversation) => {
        addMessage(conversation);

        // Auto scroll to bottom of message box when a new message is entered
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
      });

      // Auto scroll to bottom of message box when all messages are loaded
    }
    if (conversation !== null) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }

    // eslint-disable-next-line
  }, [socket, auth.user, conversation]);

  const [formData, setFormData] = useState({
    message: '',
  });

  const { message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message === '') {
      setAlert('Message is required', 'error');
    } else {
      socket.emit('message', {
        room: match.params.id,
        user: auth.user._id,
        message,
      });
      setFormData({ ...formData, message: '' });
    }
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant='h4' style={{ marginBottom: '10px' }}>
            <i className='fas fa-user'></i>{' '}
            {!loading &&
              auth.user !== null &&
              conversation !== null &&
              conversation.users.filter(
                (item) => item.user._id !== auth.user._id
              )[0].user.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div
            style={{
              background: 'rgb(218, 218, 218)',
              padding: '15px',
              marginTop: '0.8rem',
              width: '100%',
              height: '500px',
              overflowY: 'scroll',
              borderRadius: '10px 10px 0px 0px',
            }}
            ref={messageBoxRef}
          >
            {!loading &&
            auth.user !== null &&
            conversation !== null &&
            conversation.messages.length > 0 ? (
              conversation.messages.map((message) => (
                <Fragment>
                  <Message key={message._id} message={message} auth={auth} />
                </Fragment>
              ))
            ) : (
              <div style={{ fontSize: '1.5rem' }}>No messages found</div>
            )}
          </div>
          <div
            style={{
              background: '#3A3FC6',
              padding: '20px 15px',
              borderRadius: '0px 0px 10px 10px',
            }}
          >
            <form onSubmit={(e) => onSubmit(e)}>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  name='message'
                  value={message}
                  onChange={(e) => onChange(e)}
                  label='Enter message here'
                  variant='outlined'
                  fullWidth={true}
                  margin='dense'
                  style={{ backgroundColor: 'white' }}
                />
                <Button type='submit' style={{ display: 'none' }} />
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getConversationById: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  conversation: state.conversation,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getConversationById,
  setAlert,
  addMessage,
})(Conversation);
