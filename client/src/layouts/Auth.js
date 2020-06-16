import React, { Fragment, useEffect, createRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbars/AuthNavbar';
import Footer from 'components/Footer/Footer.js';
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';
import Homepage from '../views/Auth/Homepage.js';
import CustomAlert from '../components/CustomAlert/CustomAlert';

import styles from '../assets/jss/material-dashboard-react/layouts/authStyle';

let ps;

const switchRoutes = (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/homepage' component={Homepage} />
    <Redirect from='/' to='/login' />
  </Switch>
);

const useStyles = makeStyles(styles);

const Auth = () => {
  const classes = useStyles();
  const mainPanel = createRef();

  useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }

    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
    };
  }, [mainPanel]);

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <Navbar />
        <div className={classes.mainPanel} ref={mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <CustomAlert />
              {switchRoutes}
              {/* <Homepage classes={classes} /> */}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
