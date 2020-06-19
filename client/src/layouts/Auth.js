import React, { Fragment, useEffect, createRef } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Homepage from '../views/Auth/Homepage.js';
import CustomAlert from '../components/CustomAlert/CustomAlert';

import styles from '../assets/jss/material-dashboard-react/layouts/authStyle';
import spikes from 'assets/images/spikes.png';

let ps;

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
      <div
        className={classes.wrapper}
        style={{ background: 'url(' + spikes + ')' }}
      >
        <div className={classes.mainPanel} ref={mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <CustomAlert />
              <Homepage classes={classes} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
