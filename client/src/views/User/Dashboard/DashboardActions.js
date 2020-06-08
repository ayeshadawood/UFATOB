import React, { Fragment } from 'react';
import GridItem from 'components/Grid/GridItem.js';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <Link to='/user/edit-profile'>
          <Button
            color='primary'
            variant='contained'
            style={{ margin: '10px 0', marginRight: '10px' }}
          >
            <i
              className='fas fa-user-circle'
              style={{ marginRight: '5px' }}
            ></i>{' '}
            Edit profile
          </Button>
        </Link>
        <Link to='/user/add-experience'>
          <Button
            color='primary'
            variant='contained'
            style={{ margin: '10px 0', marginRight: '10px' }}
          >
            <i className='fab fa-black-tie' style={{ marginRight: '5px' }}></i>{' '}
            Add experience
          </Button>
        </Link>
        <Link to='/user/add-education'>
          <Button
            color='primary'
            variant='contained'
            style={{ margin: '10px 0', marginRight: '10px' }}
          >
            <i className='fas fa-book' style={{ marginRight: '5px' }}></i> Add
            education
          </Button>
        </Link>
      </GridItem>
    </Fragment>
  );
};

export default DashboardActions;
