import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import styles from '../../assets/jss/material-dashboard-react/components/authHeaderStyle';

const useStyles = makeStyles(styles);

const AuthNavbar = () => {
  const classes = useStyles();

  const linkStyle = {
    color: '#ffffff',
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <Typography variant='h6' className={classes.title}>
          UFATOB
        </Typography>
        <Link to='/login'>
          <Button color='inherit' style={linkStyle}>
            Login
          </Button>
        </Link>
        <Link to='/register'>
          <Button color='inherit' style={linkStyle}>
            Register
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
