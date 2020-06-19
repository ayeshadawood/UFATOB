import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGroup } from '../../../actions/community/group';
import { Link } from 'react-router-dom';

const MyGroupItem = ({ group, deleteGroup, styles }) => {
  return (
    <Fragment>
      <Row className={styles.list_item}>
        <Col md={12}>
          <Link
            to={`/community/group/${group._id}`}
            className={styles.group_name}
          >
            {group.name}
          </Link>
          <div className='mt-2'>{group.description}</div>
          <div className='mt-2'>
            <strong>Members:</strong> {group.members.length + 1}
          </div>
          <div className='mt-2'>
            <Button
              variant='success'
              href={`/community/edit-group/${group._id}`}
            >
              Update group
            </Button>
            <Button variant='danger' onClick={() => deleteGroup(group._id)}>
              Delete group
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

MyGroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

export default connect(null, {
  deleteGroup
})(MyGroupItem);
