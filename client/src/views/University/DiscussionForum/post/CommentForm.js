import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/community/post';
import { Form, Button } from 'react-bootstrap';

const CommentForm = ({ post: { _id }, addComment }) => {
  const [formData, setFormData] = useState({
    description: ''
  });

  const { description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addComment(_id, formData);
    setFormData({ description: '' });
  };

  return (
    <Fragment>
      <Form className='my-3' onSubmit={e => onSubmit(e)}>
        <Form.Group>
          <Form.Control
            as='textarea'
            rows='5'
            placeholder='Create a new post'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Button variant='dark' type='submit'>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(null, {
  addComment
})(CommentForm);
