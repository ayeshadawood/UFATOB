import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../../../components/Grid/GridContainer.js';
import { Typography } from '@material-ui/core';
import ProfilePicture from './ProfilePicture';
import Name from './Name';
import Password from './Password';

import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles({ ...styles, input: { marginBottom: '10px' } });

const Settings = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant='h4'>
        <i className='fas fa-cog'></i> Settings
      </Typography>
      <GridContainer>
        <Fragment>
          <ProfilePicture classes={classes} />
          <Name classes={classes} />
          <Password classes={classes} />
        </Fragment>
      </GridContainer>
    </Fragment>
  );
};

export default Settings;
