import React, { Fragment } from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GroupMembers from './members/GroupMembers';
import GroupRequests from './requests/GroupRequests';
import Posts from '../posts/Posts';

const GroupNavigationTabs = ({ group, auth, post, styles }) => {
  return (
    <Fragment>
      <Tab.Container defaultActiveKey='posts'>
        <Row>
          <Col md={12}>
            <Nav justify variant='tabs'>
              <Nav.Item>
                <Nav.Link eventKey='posts'>Posts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='members'>Members</Nav.Link>
              </Nav.Item>
              {auth.user !== null &&
                group !== null &&
                group.admin._id === auth.user._id && (
                  <Nav.Item>
                    <Nav.Link eventKey='requests'>Requests</Nav.Link>
                  </Nav.Item>
                )}
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Tab.Content>
              <Tab.Pane eventKey='posts'>
                {auth.user !== null &&
                group !== null &&
                (group.admin._id === auth.user._id ||
                  group.members
                    .map(member => member.user._id)
                    .indexOf(auth.user._id) > -1) ? (
                  <Posts
                    group={group}
                    post={post}
                    auth={auth}
                    styles={styles}
                  />
                ) : (
                  <div className='lead my-3'>
                    You must be a member of this group to view posts
                  </div>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey='members'>
                <GroupMembers group={group} auth={auth} styles={styles} />
              </Tab.Pane>
              {auth.user !== null &&
                group !== null &&
                group.admin._id === auth.user._id && (
                  <Tab.Pane eventKey='requests'>
                    <GroupRequests group={group} styles={styles} />
                  </Tab.Pane>
                )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
};

GroupNavigationTabs.propTypes = {
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
};

export default GroupNavigationTabs;
